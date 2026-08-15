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
 *   2. Le pilote, lui, ne l'est pas :  npm i -D playwright
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
 * La vitrine est protégée par mot de passe. Shopify pose un cookie de session
 * après le formulaire ; on le fait une fois, le contexte le garde ensuite.
 */
async function deverrouiller(page, motDePasse) {
  await page.goto(`${BOUTIQUE}/password`, { waitUntil: 'domcontentloaded' });

  const champ = page.locator('input[type="password"]').first();
  if ((await champ.count()) === 0) return; // déjà déverrouillée

  await champ.fill(motDePasse);
  await champ.press('Enter');
  await page.waitForLoadState('domcontentloaded');

  if (page.url().includes('/password')) {
    throw new Error('mot de passe refusé par la vitrine');
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
  const navigateur = await chromium.launch();

  try {
    for (const { nom, largeur, hauteur, mobile } of LARGEURS) {
      const contexte = await navigateur.newContext({
        viewport: { width: largeur, height: hauteur },
        deviceScaleFactor: 2,
        isMobile: mobile,
        hasTouch: mobile,
        locale: 'fr-FR',
      });
      const page = await contexte.newPage();

      await deverrouiller(page, motDePasse);

      for (const chemin of chemins) {
        const url = `${BOUTIQUE}${chemin}?preview_theme_id=${THEME_DEV}`;
        await page.goto(url, { waitUntil: 'networkidle' });

        // Les sections d'Horizon s'hydratent à l'approche du viewport : sans
        // ce défilement, tout ce qui est sous la ligne de flottaison est
        // capturé vide.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 150));
          }
          window.scrollTo(0, 0);
        });
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
