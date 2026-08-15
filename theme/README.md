# Thème atelierbkrmods

Thème Shopify de la boutique [bkrmods.fr](https://bkrmods.fr), basé sur Dawn et
complété par le système « Liquid Glass » (`assets/liquid-glass.css`, sections
`lg-*`).

## Code couleur

La charte tient en trois couleurs, définies **à un seul endroit**, en tête de
`assets/liquid-glass.css` :

| Token         | Hex       | Rôle                       |
| ------------- | --------- | -------------------------- |
| `--bkr-noir`  | `#0E0E0E` | fond principal             |
| `--bkr-blanc` | `#F3F3F1` | texte, encre, logo         |
| `--bkr-vert`  | `#1C5A4B` | boutons, accents, survols  |

Direction artistique : premium, minimaliste, moderne — pas de doré, pas de
chrome, pas d'effet flashy. Le dégradé métal brossé qui balayait les titres
(`.lg-steel`) a été remplacé par un simple souligné vert.

Quatre déclinaisons complètent la charte, sans y ajouter de couleur :

| Token               | Hex       | Rôle                                          |
| ------------------- | --------- | --------------------------------------------- |
| `--bkr-noir-doux`   | `#121212` | fond adouci, dégradés                         |
| `--bkr-noir-relief` | `#171717` | surfaces surélevées, cartes, verre            |
| `--bkr-vert-clair`  | `#2E8F76` | accent **porteur de texte** sur noir, survols |
| `--bkr-vert-sombre` | `#123A31` | halos et ombres colorées                      |

`--bkr-vert-clair` existe pour une raison précise : le Vert Racing en texte sur
le noir ne donne que 2,4:1, sous le seuil de lisibilité. Le vert éclairci monte
à 4,9:1 (WCAG AA). Le vert de marque reste utilisé en aplat — un bouton vert
avec libellé blanc cassé donne 7,2:1.

Les cinq schémas de couleurs de `config/settings_data.json` en découlent :

| Schéma     | Fond    | Bouton | Rôle                                 |
| ---------- | ------- | ------ | ------------------------------------ |
| `scheme-1` | noir    | vert   | fond par défaut du site              |
| `scheme-2` | #171717 | vert   | cartes produit, collection, article  |
| `scheme-3` | noir    | vert   | sections éditoriales et pied de page |
| `scheme-4` | blanc   | vert   | inversion claire, badges             |
| `scheme-5` | vert    | blanc  | mise en avant                        |

**Pour changer la charte** : modifier les trois variables `--bkr-*` en tête de
`assets/liquid-glass.css`, et reporter les mêmes hex dans les schémas de
`config/settings_data.json` (ceux-ci sont lus par l'éditeur de thème Shopify et
ne peuvent pas référencer une variable CSS).

Les couleurs de cadran (bleu, vert, bordeaux…) ne font pas partie de la charte :
elles décrivent un produit et vivent dans `snippets/lg-dial-color.liquid`.

## Logo

Le lettrage BKR est livré avec le thème (`assets/bkr-logo.png`, 600 × 168 px,
fond transparent, aux couleurs de la charte) et rendu par
`snippets/bkr-logo.liquid`, utilisé par l'en-tête et par la page mot de passe.

Le snippet donne la priorité au logo chargé dans **Réglages du thème > Logo** ;
il ne sert le fichier du thème que si ce réglage est vide. Charger le logo dans
la bibliothèque de fichiers Shopify reste donc possible à tout moment et prendra
automatiquement le dessus — c'est d'ailleurs le seul chemin pour la favicon, qui
ne peut venir que des réglages.

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
