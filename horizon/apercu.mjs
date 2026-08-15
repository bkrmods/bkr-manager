/**
 * Captures d'écran du thème de dev, aux largeurs qui comptent pour BKR.
 *
 * Le trafic attendu vient de TikTok, d'Instagram et de Google mobile : 375,
 * 390 et 430 px décident du rendu réel, pas le 1440 du poste de travail.
 * D'où l'ordre des largeurs ci-dessous — le desktop passe en dernier.
 *
 * Prérequis
 *   1. Chromium est déjà présent (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers).
 *      Ne jamais lancer `playwright install`.
 *   2. Le pilote, lui, ne l'est pas, et sa version doit correspondre au
 *      Chromium installé, sinon il en réclame un autre :  npm i -D playwright
 *   3. La politique réseau de l'environnement doit autoriser
 *      *.myshopify.com, *.shopifycdn.com et cdn.shopify.com. Sans le CDN la
 *      page se charge sans styles ni images : la capture ne vaut rien.
 *
 * Usage
 *   BKR_MDP=<mot de passe boutique> node horizon/apercu.mjs [chemin...]
 *
 *   BKR_MDP=xxx node horizon/apercu.mjs                 # la page d'accueil
 *   BKR_MDP=xxx node horizon/apercu.mjs / /collections  # deux pages
 *
 * Le mot de passe passe par l'environnement et n'est jamais écrit sur le
 * disque : il n'a rien à faire dans le dépôt.
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BOUTIQUE = 'https://e5e896-dn.myshopify.com';
const THEME_DEV = '186469122384';
const SORTIE = 'captures';

/** Mobile d'abord : c'est là que les sections cassent. */
const LARGEURS = [
  { nom: '375', largeur: 375, hauteur: 812, mobile: true },
  { nom: '390', largeur: 390, hauteur: 844, mobile: true },
  { nom: '430', largeur: 430, hauteur: 932, mobile: true },
  { nom: '1440', largeur: 1440, hauteur: 900, mobile: false },
];

/**
 * Deux habillages ne font pas partie de la vitrine et n'ont rien à faire sur
 * une capture : la barre d'aperçu que Shopify ajoute avec `preview_theme_id`
 * (elle recouvre le haut de la page — c'est elle qui rognait les accents du
 * premier titre) et le bandeau de consentement aux cookies, qui masque le Hero
 * entier sur mobile.
 */
async function retirerHabillage(page) {
  await page
    .addStyleTag({ content: '#PBarNextFrameWrapper, #PBarNextFrame { display: none !important; }' })
    .catch(() => {});

  // Horizon pose 'content-visibility: auto' sur quelques conteneurs, dont
  // celui des menus du pied de page. Le navigateur saute alors le rendu de ce
  // qui est loin de la fenêtre : en capture pleine page le bloc sort vide et
  // son conteneur s'écrase à quelques pixels, la section suivante passant
  // par-dessus. Un visiteur, lui, voit bien ces menus — c'est la capture qui
  // ment.
  //
  // L'en-tête est exclu : ses panneaux de méga-menu portent le même réglage,
  // et les forcer revient à déplier le menu, ce qui déporte la barre au milieu
  // de la page.
  await page.evaluate(() => {
    const enTete = document.querySelector('.shopify-section-group-header-group');
    for (const element of document.querySelectorAll('*')) {
      if (getComputedStyle(element).contentVisibility !== 'auto') continue;
      if (enTete?.contains(element)) continue;
      element.style.contentVisibility = 'visible';
    }
  });


  // Le bandeau est injecté par un script tiers, après le `load` : le chercher
  // tout de suite ne donne rien, il faut l'attendre.
  const bandeau = page.locator('#shopify-pc__banner');
  try {
    await bandeau.waitFor({ state: 'visible', timeout: 10000 });
  } catch {
    return; // consentement déjà donné dans ce contexte, ou bandeau désactivé
  }

  // Refuser plutôt qu'accepter : la capture n'a pas besoin des traceurs, et la
  // page se stabilise plus vite sans eux.
  await page.locator('#shopify-pc__banner__btn-decline').click({ timeout: 5000 }).catch(() => {});
  await bandeau.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
}

/**
 * Quand la session sort par un proxy (c'est le cas des sessions Claude Code),
 * Chromium n'arrive pas à monter son TLS au travers : son ClientHello embarque
 * une clé post-quantique (~1,8 ko) qu'on ne peut plus désactiver depuis
 * Chromium 141, et le tunnel se fait couper — ERR_CONNECTION_RESET sur tout,
 * y compris example.com.
 *
 * La pile réseau de Node, elle, passe très bien. On détourne donc chaque
 * requête vers `context.request`, qui est côté Node : Chromium ne fait plus de
 * TLS du tout, il ne reçoit que des réponses déjà déchiffrées. Les cookies
 * restent partagés avec le contexte, ce qui est indispensable pour le mot de
 * passe de la vitrine.
 *
 * Le relais suit lui-même les redirections. Ce n'est pas un détail : une fois
 * qu'on a servi une 3xx à Chromium, la requête suivante de la chaîne ne repasse
 * plus par le détournement, il la joue en direct — et elle casse. Conséquence à
 * connaître : `page.url()` reste sur l'URL demandée, jamais sur la destination
 * finale. C'est le contenu de la page qui fait foi, pas son URL.
 */
async function brancherRelais(contexte) {
  await contexte.route('**/*', async (route) => {
    try {
      const reponse = await contexte.request.fetch(route.request(), { timeout: 30000 });
      await route.fulfill({ response: reponse });
    } catch {
      // Le contexte se ferme pendant que des requêtes de télémétrie sont
      // encore en vol : sans ça, elles feraient échouer la capture.
      await route.abort().catch(() => {});
    }
  });
}

/**
 * Retrouve l'élément qui défile réellement.
 *
 * Ce n'est pas toujours le document : au-delà de 990 px, Horizon fige
 * `html` et `body` en `overflow: hidden` et fait défiler `.page-wrapper`. Une
 * capture pleine page s'arrête alors au premier écran, et c'est ce qui rendait
 * les vues 1440 inutilisables — on ne voyait que le Hero.
 */
const TROUVER_DEFILEUR = `() => {
  const racine = document.scrollingElement || document.documentElement;
  if (racine.scrollHeight > racine.clientHeight + 1) return racine;
  return [...document.querySelectorAll('body *')].find(
    (element) =>
      element.scrollHeight > element.clientHeight + 1 &&
      /auto|scroll|hidden/.test(getComputedStyle(element).overflowY)
  ) || racine;
}`;

/**
 * Les sections d'Horizon s'hydratent à l'approche de la fenêtre : sans ce
 * parcours, tout ce qui est sous la ligne de flottaison est capturé vide.
 *
 * Le retour en haut doit être sec. Le thème défile en douceur, et une capture
 * déclenchée pendant l'animation fige l'en-tête collant au milieu de l'image.
 */
async function parcourirLaPage(page) {
  await page.evaluate(async (source) => {
    const defileur = eval(source)();
    const douceur = defileur.style.scrollBehavior;
    defileur.style.scrollBehavior = 'auto';

    const pas = defileur.clientHeight || window.innerHeight;
    for (let y = 0; y < defileur.scrollHeight; y += pas) {
      defileur.scrollTop = y;
      await new Promise((r) => setTimeout(r, 150));
    }

    defileur.scrollTop = 0;
    await new Promise((r) => setTimeout(r, 200));
    defileur.style.scrollBehavior = douceur;
  }, TROUVER_DEFILEUR);
}

/**
 * Rend la page haute quand c'est un conteneur interne qui défile, pour que la
 * capture pleine page voie autre chose que le premier écran.
 */
async function aplatirLeDefilement(page) {
  await page.evaluate((source) => {
    const racine = document.scrollingElement || document.documentElement;
    if (racine.scrollHeight > racine.clientHeight + 1) return; // le document défile déjà

    const defileur = eval(source)();
    if (defileur === racine) return;

    for (const element of [document.documentElement, document.body, defileur]) {
      element.style.setProperty('overflow', 'visible', 'important');
      element.style.setProperty('height', 'auto', 'important');
      element.style.setProperty('max-height', 'none', 'important');
    }
  }, TROUVER_DEFILEUR);
}

/**
 * Une navigation peut échouer pour deux raisons sans gravité : la page de
 * garde qui relance une navigation par-dessus la nôtre, et le réseau qui
 * bafouille. Dans les deux cas, réessayer coûte moins cher que perdre la série.
 */
async function ouvrir(page, url, options = {}) {
  for (let essai = 1; ; essai++) {
    try {
      return await page.goto(url, { waitUntil: 'domcontentloaded', ...options });
    } catch (erreur) {
      if (essai === 3) throw erreur;
      await page.waitForTimeout(1000 * essai);
    }
  }
}

/**
 * Marqueur de la vraie vitrine. La page de garde de Shopify n'a ni en-tête ni
 * pied de page du thème : si ce groupe de sections est là, on est passé.
 */
const MARQUEUR_VITRINE = '.shopify-section-group-header-group';

/**
 * La vitrine est protégée par mot de passe. Shopify pose un cookie de session
 * après le formulaire ; on le fait une fois, le contexte le garde ensuite.
 *
 * La vérification cherche l'en-tête du thème, et non l'absence du champ de mot
 * de passe. Chercher une absence a déjà menti : sur la page de garde le champ
 * vit dans une <dialog> peuplée par un script, donc un test lancé trop tôt le
 * compte à zéro et conclut que tout va bien. Un contexte est reparti verrouillé
 * sans que rien ne le signale, et ses captures montraient « Opening soon ».
 */
async function deverrouiller(page, motDePasse) {
  for (let essai = 1; ; essai++) {
    await ouvrir(page, `${BOUTIQUE}/password`);

    const champ = page.locator('input[type="password"]').first();
    if ((await champ.count()) > 0) {
      // Horizon range le formulaire dans une <dialog> : tant qu'on n'a pas
      // cliqué « Accéder avec le mot de passe », le champ reste invisible.
      if (!(await champ.isVisible())) {
        await page.getByRole('button', { name: /mot de passe/i }).first().click();
        await champ.waitFor({ state: 'visible', timeout: 10000 });
      }

      await champ.fill(motDePasse);
      // Attendre la navigation de l'envoi, sinon la vérification part pendant
      // que le formulaire est encore en vol et se fait interrompre.
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
        champ.press('Enter'),
      ]);
    }

    await ouvrir(page, `${BOUTIQUE}/`);
    try {
      await page.locator(MARQUEUR_VITRINE).first().waitFor({ state: 'attached', timeout: 15000 });
      return;
    } catch {
      if (essai === 2) throw new Error('la vitrine est restée verrouillée après deux tentatives');
      await page.waitForTimeout(2000);
    }
  }
}

function nomFichier(chemin, largeur) {
  const base = chemin === '/' ? 'accueil' : chemin.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
  return `${base}-${largeur}.png`;
}

async function main() {
  const motDePasse = process.env.BKR_MDP;
  if (!motDePasse) {
    console.error('BKR_MDP manquant. Le mot de passe de la vitrine est requis.');
    console.error('Il se trouve dans Boutique en ligne > Préférences > Protection par mot de passe.');
    return 2;
  }

  const chemins = process.argv.slice(2);
  if (chemins.length === 0) chemins.push('/');

  await mkdir(SORTIE, { recursive: true });

  // Ni Chromium ni le relais Node ne lisent HTTPS_PROXY tout seuls.
  const serveurProxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const proxy = serveurProxy ? { proxy: { server: serveurProxy } } : {};
  const navigateur = await chromium.launch(proxy);

  try {
    for (const { nom, largeur, hauteur, mobile } of LARGEURS) {
      const contexte = await navigateur.newContext({
        viewport: { width: largeur, height: hauteur },
        deviceScaleFactor: 2,
        isMobile: mobile,
        hasTouch: mobile,
        locale: 'fr-FR',
        ...proxy,
      });
      if (serveurProxy) await brancherRelais(contexte);
      const page = await contexte.newPage();

      await deverrouiller(page, motDePasse);

      for (const chemin of chemins) {
        const url = `${BOUTIQUE}${chemin}?preview_theme_id=${THEME_DEV}`;
        // La télémétrie de Shopify ne se tait jamais vraiment : `networkidle`
        // en tâche d'attente principale finit par expirer. On attend le `load`,
        // qui garantit les feuilles de style et les images, puis on laisse au
        // réseau une chance de se calmer sans en faire une condition.
        await ouvrir(page, url, { waitUntil: 'load', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await retirerHabillage(page);

        await parcourirLaPage(page);
        await aplatirLeDefilement(page);
        await page.waitForTimeout(400);

        const fichier = path.join(SORTIE, nomFichier(chemin, nom));
        await page.screenshot({ path: fichier, fullPage: true });
        console.log(fichier);
      }

      await contexte.close();
    }
  } finally {
    await navigateur.close();
  }

  return 0;
}

process.exitCode = await main();
