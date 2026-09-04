/**
 * Captures d'états interactifs : ce que `apercu.mjs` ne peut pas montrer.
 *
 * `apercu.mjs` photographie des pages au repos. Or trois choses du site ne
 * s'évaluent que déclenchées : le survol d'une carte produit, le tiroir de
 * menu, et le tiroir de panier. Elles vivent ici pour ne pas alourdir le
 * script principal, qui reste la QA de tous les jours.
 *
 * Usage
 *   BKR_MDP=<mot de passe> node horizon/etats.mjs
 *
 * Sortie : captures/etat-<nom>-<largeur>.png
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BOUTIQUE = 'https://e5e896-dn.myshopify.com';
const THEME_DEV = '186548322640';
const SORTIE = 'captures';

const LARGEURS = [
  { nom: '390', largeur: 390, hauteur: 844, mobile: true },
  { nom: '1440', largeur: 1440, hauteur: 900, mobile: false },
];

const MARQUEUR_VITRINE = '.shopify-section-group-header-group';

/** Voir apercu.mjs : Chromium ne monte pas son TLS au travers du proxy. */
async function brancherRelais(contexte) {
  await contexte.route('**/*', async (route) => {
    try {
      const reponse = await contexte.request.fetch(route.request(), { timeout: 30000 });
      await route.fulfill({ response: reponse });
    } catch {
      await route.abort().catch(() => {});
    }
  });
}

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

async function deverrouiller(page, motDePasse) {
  for (let essai = 1; ; essai++) {
    await ouvrir(page, `${BOUTIQUE}/password`);

    const champ = page.locator('input[type="password"]').first();
    if ((await champ.count()) > 0) {
      if (!(await champ.isVisible())) {
        await page.getByRole('button', { name: /mot de passe/i }).first().click();
        await champ.waitFor({ state: 'visible', timeout: 10000 });
      }
      await champ.fill(motDePasse);
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

async function retirerHabillage(page) {
  await page
    .addStyleTag({ content: '#PBarNextFrameWrapper, #PBarNextFrame { display: none !important; }' })
    .catch(() => {});
  const bandeau = page.locator('#shopify-pc__banner');
  try {
    await bandeau.waitFor({ state: 'visible', timeout: 10000 });
  } catch {
    return;
  }
  await page.locator('#shopify-pc__banner__btn-decline').click({ timeout: 5000 }).catch(() => {});
  await bandeau.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
}

async function aller(page, chemin) {
  await ouvrir(page, `${BOUTIQUE}${chemin}?preview_theme_id=${THEME_DEV}`, {
    waitUntil: 'load',
    timeout: 60000,
  });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await retirerHabillage(page);
}

/**
 * La capture est volontairement limitée à la fenêtre, pas à la page entière :
 * un tiroir est un élément fixe, et une capture pleine page le poserait au
 * milieu d'une image de 8 000 px de haut.
 */
async function photo(page, nom, largeur) {
  const fichier = path.join(SORTIE, `etat-${nom}-${largeur}.png`);
  await page.screenshot({ path: fichier });
  console.log(fichier);
}

async function survolCarte(page, largeur) {
  await aller(page, '/collections/jour-date');
  const carte = page.locator('product-card').first();
  await carte.waitFor({ state: 'visible', timeout: 15000 });
  await carte.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await photo(page, 'carte-repos', largeur);
  await carte.hover();
  // Le zoom dure 0,25 s (--hover-transition-duration) : laisser finir.
  await page.waitForTimeout(700);
  await photo(page, 'carte-survol', largeur);
}

/*
 * Sélecteurs relevés dans le DOM d'Horizon 4.1.4. Les deviner coûte cher :
 * « le premier bouton de l'en-tête » ouvre la recherche, et
 * `getByRole('button', { name: /panier/i })` attrape l'icône de l'en-tête,
 * qui ouvre le tiroir sans rien y mettre.
 */
const MENU_MOBILE = 'summary.header__icon--menu';
const AJOUTER = 'button.add-to-cart-button:not(.sticky-add-to-cart__button)';

async function menuOuvert(page, largeur) {
  await aller(page, '/');

  if (largeur !== '390') {
    // Desktop : le méga-menu s'ouvre au survol de l'entrée.
    await page.getByRole('link', { name: /^Collections$/ }).first().hover({ timeout: 10000 });
    await page.waitForTimeout(900);
    await photo(page, 'menu', largeur);
    return;
  }

  await page.locator(MENU_MOBILE).first().click({ timeout: 10000 });
  await page.waitForTimeout(900);
  await photo(page, 'menu', largeur);

  // Le second niveau est un accordéon : le déplier montre les huit collections.
  await page.locator('summary.menu-drawer__menu-item--mainlist').nth(1).click({ timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(700);
  await photo(page, 'menu-deplie', largeur);
}

async function panierOuvert(page, largeur) {
  await aller(page, '/collections/jour-date');
  const lien = page.locator('product-card a.product-card__link').first();
  await lien.waitFor({ state: 'attached', timeout: 15000 });
  await aller(page, await lien.getAttribute('href'));

  // La version collante du bouton est hors écran tant qu'on n'a pas défilé :
  // la viser fait échouer le clic sur « element is outside of the viewport ».
  const ajouter = page.locator(AJOUTER).first();
  await ajouter.waitFor({ state: 'visible', timeout: 15000 });
  await ajouter.click({ timeout: 15000 });
  await page.waitForTimeout(3000);
  await photo(page, 'panier', largeur);
}

async function main() {
  const motDePasse = process.env.BKR_MDP;
  if (!motDePasse) {
    console.error('BKR_MDP manquant.');
    return 2;
  }

  await mkdir(SORTIE, { recursive: true });

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

      for (const etat of [survolCarte, menuOuvert, panierOuvert]) {
        try {
          await etat(page, nom);
        } catch (erreur) {
          console.error(`${etat.name} @ ${nom} : ${erreur.message}`);
        }
      }

      await contexte.close();
    }
  } finally {
    await navigateur.close();
  }

  return 0;
}

process.exitCode = await main();
