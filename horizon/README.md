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

## Ce que les gabarits contiennent

**Uniquement les réglages volontairement choisis.** Horizon applique la valeur
par défaut de son schéma pour tout réglage absent : réécrire `"border": "none"`
ou `"padding-block-end": 0` n'ajoute rien, sinon du bruit qui masque les vraies
décisions. `index.json` est passé de 33 976 à 10 195 octets par ce seul nettoyage
et par le compactage — sans qu'une seule valeur de rendu change.

Deux familles de réglages ont disparu en masse :

- **Les réglages de typographie sous `type_preset`.** `font`, `font_size`,
  `line_height`, `letter_spacing`, `case` et `wrap` ne sont lus que si
  `type_preset` vaut `custom` — `snippets/typography-style.liquid` enferme tout
  son contenu dans ce test. Aucun bloc du projet n'utilise `custom` : ces six
  réglages n'ont jamais rien fait. Le `font_size: "0.75rem"` du sur-titre du
  Hero, en particulier, n'a jamais été appliqué ; la taille vient du preset `h6`.
- **Les couleurs qui répètent la palette.** Un `text_color` absent hérite déjà de
  `settings.color_palette.foreground`. Le laisser vide, c'est suivre la charte
  automatiquement ; l'écrire en dur, c'est un endroit de plus à corriger le jour
  où la charte bouge. Les seules couleurs encore écrites sont celles qui
  s'écartent volontairement de la valeur héritée — `color1` sur les sous-titres.

Les sections `hero` et `product-list` gardent tous leurs réglages : leurs
schémas font 44 et 27 Ko, les lire coûtait plus que le nettoyage ne rapportait.
À faire le jour où on doit les ouvrir pour une autre raison.

## Deux valeurs d'énumération qui n'existaient pas

Corrigées le 14 août, après lecture des schémas `button` et `_product-list-button` :

| Écrit | Valide ? | Corrigé en |
| --- | --- | --- |
| `style_class: "link"` | non | `"button-unstyled"` |
| `width_mobile: "fill"` | non | `"custom"` |

Les deux venaient du même réflexe : recopier une valeur qui *paraît* juste —
`fill` existe bien sur un `group`, `link` décrit bien l'effet voulu — au lieu de
la lire dans le schéma du bloc concerné. Horizon ne signale rien : le rendu
retombe silencieusement sur la valeur par défaut. Les quatre CTA en style lien
étaient donc des boutons pleins, et les trois boutons « pleine largeur sur
mobile » ne l'étaient pas.

C'est exactement le piège que le skill `horizon-section` décrit, et il a quand
même été tendu deux fois : lire le schéma **du bloc qu'on écrit**, pas d'un bloc
voisin qui lui ressemble.

## Deux formes du même fichier

Les gabarits JSON sont versionnés ici **en clair**, indentés, pour être relus et
commentés en revue. Ils sont envoyés à Shopify **compactés**.

La raison est mécanique : `themeFilesUpsert` ne fait pas de correctif partiel.
Ajouter une section à la page d'accueil oblige à retransmettre `index.json` en
entier. En clair il pèse 33 976 octets, compacté 19 228 — 43 % de moins à chaque
écriture, et ça continuera de compter à mesure que la page s'allonge.

    python3 horizon/compacter.py horizon/templates/index.json

Le script écrit un `.min.json` à côté (ignoré par git) et affiche le nombre exact
d'octets. **C'est la vérification d'après-écriture** : le champ `size` renvoyé
par l'API doit valoir exactement ce nombre. S'il diffère, le contenu transmis
n'est pas celui du fichier local — relire, ne pas supposer.

L'écart entre les deux formes n'est que de l'espacement : `json.loads` des deux
côtés donne le même objet. Et Shopify réindente le fichier de lui-même dès que
quelqu'un enregistre depuis l'éditeur de thème, donc la forme stockée n'est de
toute façon jamais stable dans le temps.

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
- `enable_transparent_header_home: true` : l'en-tête flotte au-dessus du Hero
  sur l'accueil, puis reprend son fond noir au défilement. Réglage natif,
  aucun CSS ni JS ajouté.

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

## Hero — page d'accueil

Section native `hero`, plein écran (`section_height: "full-screen"`), contenu
aligné en bas à gauche. Quatre blocs, tous éditables depuis l'éditeur :

| Bloc | Contenu |
| --- | --- |
| Sur-titre | `BKR MODS` |
| Titre | `<h1>Seiko Mods sélectionnées pour se démarquer.</h1>` |
| Sous-titre | Mouvements éprouvés. Matériaux sélectionnés. Design sans compromis. |
| CTA | « Découvrir les montres » (vert) + « Arabic Dial » (contour ivoire) |

Points de vigilance tenus :

- **Un seul H1.** Dans Horizon, le bloc `text` rend le HTML du réglage tel quel
  et `type_preset` ne fait que la taille. Le `<h1>` est donc explicite et
  unique ; le sur-titre et le sous-titre sont des `<p>` stylés, pas des titres.
- **LCP.** La section étant en première position, Horizon passe automatiquement
  l'image du Hero en `fetchpriority="high"` avec `srcset` complet — rien à
  forcer.
- **Lisibilité.** Overlay en dégradé du noir de charte (`#0E0E0EA6`) monté vers
  le haut : le texte se détache quelle que soit la photo.
- **Mobile.** Les deux boutons passent en pleine largeur sous 750 px
  (`width_mobile: "custom"`, la largeur personnalisée valant 100 % par défaut),
  et le Hero occupe `100svh` — pas de barre d'adresse qui rogne la hauteur.
  Le bloc `button` n'a que deux largeurs, `fit-content` et `custom` : il n'y a
  pas de valeur `fill` comme sur un `group`.
- **Aucun effet gratuit** : `blurred_reflection` laissé à `false`.

**Média** : aucune image n'est encore chargée, Horizon affiche donc son
placeholder. Les réglages `image_1` (desktop) et `image_1_mobile` (avec
`custom_mobile_media`) attendent les vraies photos.

## Best-sellers — page d'accueil

Section native `product-list` branchée sur la collection manuelle
`best-sellers`, dont l'ordre se réorganise à la souris dans l'admin Shopify —
c'est la « sélection configurable » du cahier des charges, sans code.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `max_products` | 4 | quatre montres maximum sur desktop |
| `columns` | 4 | une ligne, pas de grille qui s'étale |
| `carousel_on_mobile` | `true` | défilement horizontal fluide sous 750 px |
| `mobile_card_size` | `72cqw` | la carte suivante dépasse du bord : le geste de swipe est visible sans flèche |
| `image_ratio` | `adapt` | la photo garde son cadrage d'origine et domine la carte |

En-tête de section : `<h2>Les plus recherchées.</h2>` et un lien « Tout voir »
qui pointe automatiquement vers la collection de la section. La carte produit
n'affiche que photo, titre et prix — pas de badge de réduction, pas de mention
de stock : la sobriété fait partie du positionnement.

Tant que la collection est vide, la section ne rend rien. C'est le comportement
attendu, pas une erreur.

## Collections — page d'accueil

« Choisissez votre style. » : trois cartes éditoriales, une par famille.

| Carte | Collection | Accroche |
| --- | --- | --- |
| Arabic Dial | `arabic-dial` | Cadran arabe, chiffres orientaux. |
| Chronographes VK63 | `chronographe-vk63` | Compteurs, poussoirs, méca-quartz VK63. |
| Automatiques NH35 | `automatique-nh35` | Mécanique automatique NH35. |

**Cette section est 100 % native**, contrairement à ce que l'audit annonçait. Le
bloc `collection-card` d'Horizon accepte des blocs enfants (`text`, `button`,
`group`, `collection-title`) : le texte court et le CTA par carte, qu'on croyait
impossibles sans code, sont des réglages. Aucun fichier `.liquid` créé.

Montage :

- section `_blocks` (la section générique d'Horizon, « section personnalisée »),
  en colonne : titre, sous-titre, puis un `group`
- le `group` est en ligne avec `vertical_on_mobile: true` — trois colonnes au-delà
  de 750 px, empilées en dessous
- chaque `collection-card` porte sa collection, un `collection-title`, un `text`
  et un `button` en style `link`

Choix retenus :

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `placement` | `on_image` | le texte se pose sur la photo : plus éditorial, moins de hauteur qu'une légende sous l'image |
| `image_ratio` | `square` | trois portraits côte à côte donnaient des cartes très hautes ; empilées sur 375 px, la page devenait interminable |
| `toggle_overlay` | `true`, dégradé `#0E0E0EA6` vers le haut | même recette que le Hero : le texte reste lisible quelle que soit la photo |
| `border_radius` | `4` | le rayon de la charte |
| CTA | `style_class: "button-unstyled"` | la carte entière est déjà cliquable ; un gros bouton vert ferait doublon et sortirait le vert de son rôle d'accent |

Le titre de chaque carte vient du bloc natif `collection-title` : il suit le titre
de la collection dans l'admin Shopify. Renommer la collection renomme la carte —
rien à toucher dans le thème.

**Média** : aucune photo de collection n'est chargée, Horizon affiche son
placeholder. Les images se déposent sur la collection elle-même, dans l'admin.

## Qu'est-ce qu'une Seiko Mod ? — page d'accueil

Section native `media-with-content`, preset éditorial : un visuel qui déborde
jusqu'au bord de l'écran, le texte à côté. C'est la section pédagogique du
cahier des charges, et elle porte une partie du SEO de la page d'accueil.

| Bloc | Contenu |
| --- | --- |
| Sur-titre | `LE MODDING` |
| Titre | `<h2>Qu'est-ce qu'une Seiko Mod ?</h2>` |
| Texte | deux paragraphes : ce qui change sur la montre, puis ce que ça produit |
| CTA | « Découvrir les Seiko Mods » → `seiko-mod`, bouton vert |

La section a deux blocs statiques imposés par Horizon, `media` et `content` —
leurs identifiants ne sont pas libres, ils sont appelés en dur dans le Liquid
(`content_for 'block', id: 'media'`). Le bloc `content` accepte `@theme`, donc
les quatre blocs ci-dessus sont des blocs normaux, éditables et réordonnables.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `media_width` | `medium` | moitié-moitié : le texte a la place de respirer sans que l'image devienne un timbre-poste |
| `media_height` | `60svh` | Horizon rabat automatiquement à 50svh sous 750 px |
| `extend_media` | `true` | l'image touche le bord de l'écran, le texte reste dans la grille : c'est ce qui fait l'effet éditorial |
| `media_position` | `left` | alterne avec le reste de la page |

**Sur le texte.** Il décrit ce qu'est une mod — cadran, aiguilles, verre,
lunette, bracelet, réassemblage — sans avancer une seule caractéristique
chiffrée : pas d'étanchéité, pas de calibre, pas de matériau. Ces valeurs se
renseignent produit par produit, via les metafields `bkr.*`.

Il dit aussi qu'une mod « n'est pas une Seiko de série ». C'est une phrase
commerciale honnête, **pas la mention légale de transparence** : celle-là reste
à rédiger et à valider par le client, ce n'est pas un choix de développeur.

**Média** : aucune image chargée, placeholder Shopify. Le réglage `image` du
bloc `media` attend la vraie photo — idéalement un plan serré d'atelier plutôt
qu'un packshot, pour rester dans le registre pédagogique.

## Fichiers versionnés

- `config/settings_data.json` — design system BKR (palette, boutons, rayons, badges, logo)
- `sections/header-group.json` — en-tête : menu `bkr-main`, annonce en français, sélecteurs coupés
- `sections/footer-group.json` — 4 colonnes de menu, politiques, réseaux sociaux vidés
- `templates/index.json` — page d'accueil : Hero BKR + Best-sellers + Collections (la démo d'usine d'Horizon est retirée)

## Collections Shopify

| Handle | Titre | Rôle |
| --- | --- | --- |
| `seiko-mod` | Toutes les Seiko Mods | catalogue complet |
| `arabic-dial` | Arabic Dial | axe cadran |
| `chronographe-vk63` | Chronographes VK63 | axe mouvement |
| `automatique-nh35` | Automatiques NH35 | axe mouvement |
| `best-sellers` | Best-sellers | sélection manuelle, ordre réglé à la souris |

`automatique-nh35` a été créée pour la section Collections : elle complète l'axe
mouvement ouvert par `chronographe-vk63` (méca-quartz d'un côté, automatique de
l'autre). Toutes sont manuelles et publiées sur la boutique en ligne. Toutes sont
vides pour l'instant — les produits n'existent pas encore.
