# BKR Mods — thème Horizon

Miroir local des fichiers du thème de développement BKR. **Seuls les fichiers
réellement modifiés sont versionnés ici** — le reste du thème est le Horizon
d'origine, non copié dans le dépôt pour éviter un fork inutile à maintenir.

| | |
| --- | --- |
| Thème de dev | **BKR — dev (Horizon)** |
| ID | `gid://shopify/OnlineStoreTheme/186469122384` |
| Statut | `UNPUBLISHED` |
| Base | Horizon (Theme Store 2481), copie du thème live |
| Thème live | **Horizon**, `186380222800`, `MAIN` — non modifié |

## Restauration

Deux niveaux de retour arrière, sans dépendre de ce dépôt :

1. **Réglages** — le bloc `presets.Horizon` de `config/settings_data.json` est
   conservé intact. Dans l'éditeur de thème, réinitialiser aux réglages du
   preset restaure la palette blanche d'origine.
2. **Thème entier** — le thème live `Horizon` reste la copie de référence : il
   suffit d'en refaire un duplicata.

## Code couleur

Horizon centralise tout dans `settings.color_palette` ; les autres réglages de
couleur pointent vers cette palette par référence Liquid
(`{{ settings.color_palette.foreground }}`). **Aucun CSS parallèle n'est
nécessaire** — c'est le système natif du thème qui porte la charte.

| Rôle | Valeur | Réglage Horizon |
| --- | --- | --- |
| Fond | `#0E0E0E` | `color_palette.background` |
| Texte | `#F3F3F1` | `color_palette.foreground` |
| Texte secondaire | `#C9CBC7` | `color_palette.color1` |
| Bordures | `#2A2C29` | `color_palette.color2` |
| Accent (boutons, variante active, badge promo) | `#1C5A4B` | valeurs littérales |

Le Racing Green n'est écrit en dur que là où il doit rester un accent : bouton
principal, variante sélectionnée, badge promotion. Partout ailleurs, la couleur
découle de la palette.

**Pour changer la charte** : modifier `color_palette` (4 valeurs) puis les
littéraux `#1C5A4B` / `#F3F3F1` des trois réglages d'accent.

## Contrastes vérifiés

| Paire | Ratio | Verdict |
| --- | --- | --- |
| Texte sur fond | 17,38:1 | AA |
| Texte secondaire sur fond | 11,81:1 | AA |
| Libellé sur bouton vert | 7,23:1 | AA |
| Badge épuisé | 14,46:1 | AA |

## Logo

Le lettrage BKR (600 × 168, fond transparent, aux couleurs de la charte) est
chargé dans la bibliothèque de fichiers Shopify et référencé par le réglage
natif `settings.logo` :

    shopify://shop_images/bkr-logo.png

Horizon prévoit aussi `settings.logo_inverse`, utilisé uniquement quand
l'en-tête transparent est actif et qu'une version alternative est nécessaire.
Le lettrage étant déjà clair sur fond transparent, il fonctionne sur les deux
états — inutile pour l'instant.

## En-tête

Tout est natif, aucun CSS ajouté :

- logo `settings.logo`, menu `bkr-main`, recherche à droite
- `enable_sticky_header: "always"`
- barre d'annonce en français, une ligne, sans promotion
- sélecteurs pays et langue **coupés** : la boutique n'a qu'un marché (France)
  et qu'une langue (fr), ils n'avaient rien à afficher
- `enable_transparent_header_home` reste à `false` : l'interrupteur est natif,
  il s'activera avec le Hero, sinon l'en-tête flotterait au-dessus du vide

## Pied de page

Quatre colonnes, une par menu Shopify, en blocs `menu` natifs :

| Colonne | Menu |
| --- | --- |
| BKR | `bkr-footer-bkr` |
| Boutique | `bkr-footer-boutique` |
| Assistance | `bkr-footer-assistance` |
| Informations | `bkr-footer-informations` |

La section `footer` dispose ses blocs en grille : 4 colonnes au-delà de 990 px,
2 sur tablette, 1 sur mobile. Chaque colonne a `show_as_accordion: true`, donc
sur mobile elles se replient en accordéons avec séparateurs — pied de page
compact sur 375 px.

Sous cette grille, `footer-utilities` porte le copyright, le bloc natif
`footer-policy-list` (les politiques Shopify) et les réseaux sociaux. **Les URL
sociales d'usine (`facebook.com`, `x.com`…) ont été vidées** : aucun lien
inventé, les champs attendent les vrais comptes.

Le formulaire d'inscription qu'Horizon plaçait dans le pied de page a été
retiré : le cahier des charges en fait une section de la page d'accueil.

## Fichiers versionnés

- `config/settings_data.json` — design system BKR (palette, boutons, rayons, badges, logo)
- `sections/header-group.json` — en-tête : menu `bkr-main`, annonce en français, sélecteurs coupés
- `sections/footer-group.json` — 4 colonnes de menu, politiques, réseaux sociaux vidés
