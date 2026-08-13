# Thème atelierbkrmods

Thème Shopify de la boutique [bkrmods.fr](https://bkrmods.fr), basé sur Dawn et
complété par le système « Liquid Glass » (`assets/liquid-glass.css`, sections
`lg-*`).

## Code couleur

La charte est définie **à un seul endroit**, en tête de
`assets/liquid-glass.css` :

| Token          | Hex       | Rôle                                    |
| -------------- | --------- | --------------------------------------- |
| `--bkr-nuit`   | `#07080A` | fond principal                          |
| `--bkr-abysse` | `#0B0D11` | fond adouci, dégradés                   |
| `--bkr-ardoise`| `#101319` | surfaces surélevées, cartes, verre      |
| `--bkr-marine` | `#12202E` | blocs mis en avant                      |
| `--bkr-ivoire` | `#F2F5F8` | encre, texte, boutons pleins            |
| `--bkr-acier`  | `#9FB4C7` | accent de marque, liens, détails        |
| `--bkr-fumee`  | `#4A6076` | accent profond, ombres colorées         |

Tout le reste en découle : les tokens `--lg-*` du système de design, les
déclinaisons `--bkr-acier-05` → `--bkr-acier-50` utilisées par les dégradés
métal, et les cinq schémas de couleurs de `config/settings_data.json` :

| Schéma     | Fond    | Rôle                                      |
| ---------- | ------- | ----------------------------------------- |
| `scheme-1` | nuit    | fond par défaut du site                   |
| `scheme-2` | ardoise | cartes produit, collection, article       |
| `scheme-3` | nuit    | sections éditoriales et pied de page      |
| `scheme-4` | ivoire  | inversion claire, badges                  |
| `scheme-5` | marine  | mise en avant, bouton acier               |

**Pour changer la charte** : modifier les sept variables `--bkr-*` en tête de
`assets/liquid-glass.css`, et reporter les mêmes hex dans les schémas de
`config/settings_data.json` (ceux-ci sont lus par l'éditeur de thème Shopify et
ne peuvent pas référencer une variable CSS).

Les couleurs de cadran (bleu, vert, bordeaux, laiton…) ne font pas partie de la
charte : elles décrivent un produit et vivent dans
`snippets/lg-dial-color.liquid`.

## Pages légales

Le pied de page affiche une **barre légale** sur toutes les pages de la
boutique. Elle est construite dans `sections/footer.liquid` à partir de trois
sources, dans cet ordre :

1. le **menu légal** de la section, s'il est renseigné dans l'éditeur ;
2. sinon, les **pages désignées par leur handle** (réglage « Pages légales ») —
   par défaut : `mentions-legales, cgv, confidentialite,
   politique-de-remboursement, livraison-et-retours, garantie` ;
3. puis les **politiques Shopify** (`shop.policies`), si « Afficher les
   politiques » est actif.

Les doublons sont écartés sur le titre : une page présente à la fois comme page
et comme politique Shopify n'apparaît qu'une fois. Les handles introuvables sont
ignorés sans erreur — ajouter une page légale se fait donc en l'ajoutant à la
liste de handles, sans toucher au code.

Le réglage « Retirer ces liens des colonnes de menu » (actif par défaut) évite
d'afficher deux fois les mêmes liens quand le menu du pied de page contient
déjà les pages légales.

## Développement

```bash
shopify theme dev --store bkrmods.fr   # aperçu local
shopify theme check                    # 11 avertissements connus, hérités de Dawn
shopify theme push                     # publication
```
