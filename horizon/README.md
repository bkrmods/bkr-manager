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

### Le menu

Deux niveaux. Quatre entrées visibles, deux qui s'ouvrent :

| Entrée | Cible | Sous-menu |
| --- | --- | --- |
| **Montres** | `seiko-mod` | Toutes les montres · Best-sellers |
| **Familles** | `/collections` | Seikojust · Dayko · Seikona · Gmteiko · Masterteiko · Seikolus · Seikoak · Santeiko |
| Guides | `/blogs/guides` | — |
| À propos | `/pages/a-propos` | — |

« Montres » regroupe le catalogue et la sélection, « Familles » les silhouettes.
Chaque collection n'apparaît **qu'une fois** — deux libellés différents pour une
même URL, c'est ce qui rend un menu illisible.

Arabic Dial et Automatiques NH35 figuraient sous « Montres » comme axes cadran
et mouvement ; le client les a retirées. Elles restent accessibles depuis
`/collections`, qui liste toutes les collections publiées — rien n'est devenu
introuvable.

Il reste une redite : « Toutes les montres » pointe sur la même collection que
son parent « Montres ». C'était un lien « voir tout » utile quand le sous-menu
en comptait quatre ; avec deux, il fait doublon. Le retirer laisserait un
sous-menu d'une seule entrée, ce qui ne vaut pas mieux — la sortie propre serait
de remonter « Best-sellers » au premier niveau et de laisser « Montres » en lien
simple. Non fait : le client n'a demandé que le retrait des deux entrées.

Horizon transforme automatiquement un menu à deux niveaux en méga-menu : rien à
coder, il suffit que le menu Shopify ait des enfants. C'est ce qui manquait —
le menu était plat, donc aucun panneau ne pouvait s'ouvrir, et il paraissait
pauvre alors que le mécanisme était déjà là.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `menu_style` | `text` | **provisoire.** Les autres valeurs affichent des images de collection ou des cartes produit dans le panneau. Sans photo ni produit, elles rendent des rectangles gris. À passer sur `collection_images` le jour où les collections ont une image : un seul réglage. |
| `drawer_accordion` | `true` | sur mobile, les deux sous-menus se replient au lieu de dérouler douze lignes |
| `drawer_dividers` | `true` | mêmes séparateurs que les accordéons du pied de page |
| `type_font_primary_link` | `heading` | la police de titre donne au menu la présence qu'il n'avait pas en police de texte. C'est aussi la valeur par défaut d'Horizon |

Le réglage `menu_style` était sur `featured_products` — hérité, jamais choisi.
Avec une boutique vide, le panneau aurait affiché des cartes produit fantômes.

**Le chevron.** Horizon dessine le bouton qui signale un sous-menu, mais le
laisse à `opacity: 0` et `pointer-events: none` : il n'apparaît qu'à la
navigation au clavier. Le panneau s'ouvre bien au survol — sans que rien ne
l'annonce. Le client a regardé son en-tête et conclu que le menu déroulant
manquait ; un visiteur aurait fait pareil. C'est la seule règle CSS du projet,
elle vit dans `assets/bkr.css`.

**Piste non prise :** `type_case_primary_link: "uppercase"` donnerait un menu
plus éditorial. C'est un choix esthétique qui se teste à l'œil, pas à l'aveugle —
une case à cocher dans l'éditeur.

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
`footer-policy-list` (les politiques Shopify) et les réseaux sociaux.

| Réseau | URL |
| --- | --- |
| Instagram | `https://www.instagram.com/bkrmods` |
| TikTok | `https://www.tiktok.com/@bkrmods` |

Facebook, YouTube et X restent **vides** : pas de compte, donc pas de lien. Le
bloc `social-links` n'affiche que les champs renseignés.

Les deux URL ont été nettoyées de leurs paramètres de suivi avant enregistrement
— celle d'Instagram arrivait avec `igsi` et `utm_source=qr`, hérités d'un partage
par QR code. Ces paramètres n'ont aucun sens dans un lien permanent de pied de
page : ils faussent les statistiques d'Instagram en attribuant à un QR code des
visites venues du site.

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

## Caractéristiques — page d'accueil

« Sur chaque montre. » Trois points, chacun une icône, un titre et une ligne.
Section `_blocks`, un `group` en ligne qui contient trois `group` en colonne —
donc trois colonnes au-delà de 750 px, empilées en dessous.

| Icône | Titre | Ligne |
| --- | --- | --- |
| `ruler` | Assemblée à la main | Chaque pièce est choisie, puis la montre est montée à l'unité. |
| `stopwatch` | Mouvements NH35 et VK63 | Automatique ou méca-quartz : les deux mouvements sur lesquels repose le catalogue. |
| `lock` | Paiement sécurisé | Le paiement est traité par Shopify. |

**Trois points et pas six, parce que les trois autres auraient été des
promesses.** Livraison, délais, retours, garantie, étanchéité, matériaux : rien
de tout ça n'est confirmé. Une bande de réassurance qui annonce « Garantie 2
ans » sans garantie écrite est un engagement contractuel pris par le site.
Ces points s'ajouteront quand les informations existeront — la section est un
`group`, on y dépose une colonne de plus sans rien réécrire.

Les trois retenus sont vérifiables : l'assemblage à l'unité est la définition
même d'une mod, NH35 et VK63 sont les deux collections de mouvement du
catalogue, et le paiement passe réellement par Shopify.

**Icônes en ivoire, pas en vert.** Le Vert Racing sur le noir de charte donne
2,4:1 : sous le seuil de 3:1 exigé pour un élément graphique porteur de sens.
Une icône verte serait décorative, pas lisible. Elles héritent donc de la
palette, comme le texte.

Le jeu d'icônes d'Horizon est orienté alimentaire et textile — `apple`,
`carrot`, `gluten_free`, `shirt`. Trois seulement conviennent à une boutique
d'horlogerie, ce qui a fixé le nombre de colonnes autant que la prudence
éditoriale.

## Newsletter — page d'accueil

Dernière section avant le pied de page, centrée : titre, une ligne, le champ.

| Bloc | Contenu |
| --- | --- |
| Titre | `<h2>Les nouvelles pièces, en premier.</h2>` |
| Sous-titre | Inscrivez-vous pour être prévenu des prochaines montres. |
| Formulaire | bloc natif `email-signup`, bouton « S'inscrire » |

**Le titre est un bloc `text` séparé, pas le réglage `heading` du formulaire.**
Ce réglage existe, mais il rend une `<div class="email-signup__heading h3">` :
l'apparence d'un titre sans en être un. Sur la seule page qui porte le `<h1>` du
site, mieux vaut un vrai `<h2>`.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `integrated_button` | `true` | le bouton se loge dans le champ : une seule ligne au lieu de deux, ce qui compte à 375 px |
| `width` / `custom_width` | `custom` / 50 | un champ d'e-mail sur toute la largeur d'un écran 1440 est disgracieux. Sous 750 px, Horizon force `width: 100%` de toute façon |
| `label` | S'inscrire | plutôt que la flèche seule : plus explicite, et la zone cliquable est plus grande |

**Aucune promesse.** Pas de « -10 % sur votre première commande », pas de
fréquence d'envoi, pas de « ventes privées » : ce sont des engagements que la
boutique devrait tenir. Le texte dit ce que fait une inscription, rien de plus.

**Reste à ajouter, et ce n'est pas un détail :** une mention de consentement et
un lien vers la politique de confidentialité sous le champ. C'est une obligation
RGPD pour une collecte d'e-mails, et c'est une formulation juridique — donc pas
un choix de développeur. Le bloc est prêt à la recevoir : un `text` de plus dans
la section.

## Page Collections — `/collections`

Entrée « Collections » dans `bkr-main`, en deuxième position, juste après
« Montres ». Type de lien natif `COLLECTIONS` : Shopify résout l'URL lui-même,
rien n'est écrit en dur.

**Les familles ne sont plus dans la navigation principale.** « Arabic Dial » et
« Chronographes » en ont été retirées quand elles sont devenues des familles :
elles vivent derrière « Collections », avec les autres. L'en-tête tient
maintenant en cinq entrées — Montres, Collections, Best-sellers, Guides, À
propos — ce qui compte sur un tiroir mobile où chaque ligne pousse les suivantes
sous la ligne de flottaison. Le menu `bkr-footer-boutique` a suivi la même
logique, pour que le pied de page ne contredise pas l'en-tête.

Aucune collection n'a été supprimée au passage : seuls des liens ont disparu.

La page utilise `main-collection-list`, gabarit `templates/list-collections.json` :
titre `<h1>Toutes nos familles.</h1>`, sous-titre, puis la grille de cartes.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `columns` | 3 | quatre cartes par ligne écrasaient les titres |
| `mobile_columns` | 2 (défaut) | deux carrés tiennent bien à 375 px |
| `placement` | `below_image` | le titre sous l'image : plus lisible qu'en surimpression quand il y a une dizaine de cartes |
| `image_ratio` | `square` | même cadrage que les cartes de l'accueil |

**Le plafond de 4 collections du gabarit d'usine n'en était pas un.** Le réglage
`max_collections` n'est lu que par la disposition `editorial` ; en `grid`, la
section boucle sur un `max_items = 20` écrit en dur dans le Liquid. Le réglage a
donc été retiré, il ne servait à rien.

### Les familles

Huit familles, nommées par le client :

| Silhouette | Nom | Handle |
| --- | --- | --- |
| Datejust | Seikojust | `classique-date` |
| Day-Date | Dayko | `jour-date` |
| Daytona | Seikona | `chronographe-vk63` |
| GMT-Master II | Gmteiko | `double-fuseau` |
| Yacht-Master | Masterteiko | `lunette-tournante` |
| Nautilus | Seikolus | `bracelet-integre` |
| Royal Oak | Seikoak | `octogonale` |
| Santos | Santeiko | `boitier-carre` |

**Les handles restent descriptifs.** Le nom de gamme s'affiche, l'URL décrit la
montre : `/collections/octogonale` porte « Seikoak ». C'est ce qui garde une
valeur de recherche à l'adresse, et ça évite de casser les liens du menu, du pied
de page et de la carte d'accueil le jour où un nom change. Les titres de cartes
viennent du bloc `collection-title`, donc ils suivent automatiquement.

**Décision du client, prise en connaissance de cause.** Ces noms combinent la
marque Seiko et un nom de modèle protégé — Datejust, Daytona, Yacht-Master et
GMT-Master sont des marques Rolex, Nautilus appartient à Patek Philippe, Royal
Oak à Audemars Piguet, Santos à Cartier. Le risque a été exposé en détail, ainsi
qu'une série de noms de remplacement (Origine, Almanach, Méridien, Circuit,
Rivage, Octave, Régate) ; le client a maintenu son choix. **C'est sa boutique et
sa décision — ne pas revenir dessus de sa propre initiative.**

Si elle devait être révisée un jour, l'opération est légère : un
`collectionUpdate` par famille sur le champ `title` et sur les balises SEO. Les
handles, les menus, le gabarit d'accueil et la page `/collections` ne bougent
pas.

`arabic-dial` est aussi une famille, et garde son nom descriptif — c'est le seul
axe qui décrive un cadran plutôt qu'une silhouette, et le seul nom de famille
qui ne pose aucune question de marque.

La collection catalogue `seiko-mod` (« Toutes les Seiko Mods ») n'est pas une
famille : c'est la cible du CTA du Hero et de l'entrée de menu « Montres ».

## La seule feuille de style du projet

`assets/bkr.css`, chargée par `snippets/stylesheets.liquid` juste après
`base.css`. Elle contient **une règle**.

Jusqu'ici tout passait par les réglages natifs et la palette : c'était le but,
et ça reste la règle. Mais le chevron des sous-menus est codé en dur dans la
feuille de style du bloc `_header-menu`, sans réglage pour le révéler. Les
options étaient :

| Option | Pourquoi non |
| --- | --- |
| Modifier `blocks/_header-menu.liquid` | 30 Ko de thème forkés pour deux propriétés, à re-fusionner à chaque mise à jour d'Horizon |
| Injecter du CSS par un bloc `custom-liquid` | la feuille arriverait en fin de page, et la règle serait planquée dans un gabarit JSON |
| Un fichier CSS dédié | 1,5 Ko, une ligne ajoutée à un snippet de 126 octets, et la raison écrite à côté de la règle |

`snippets/stylesheets.liquid` est donc le seul fichier Liquid d'Horizon modifié
sur tout le projet, et la modification tient en une ligne. Si Horizon met à jour
ce snippet, le conflit se résout en trois secondes.

**La règle pour la suite :** ce fichier n'est pas un fourre-tout. Toute règle
qu'on y ajoute doit d'abord avoir échoué à être un réglage natif, et porter en
commentaire la raison qui l'a rendue nécessaire.

## Fichiers versionnés

- `config/settings_data.json` — design system BKR (palette, boutons, rayons, badges, logo)
- `assets/bkr.css` — une règle : rendre visible le chevron des sous-menus
- `snippets/stylesheets.liquid` — une ligne ajoutée pour charger `bkr.css`
- `sections/header-group.json` — en-tête : menu `bkr-main`, annonce en français, sélecteurs coupés
- `sections/footer-group.json` — 4 colonnes de menu, politiques, réseaux sociaux vidés
- `templates/index.json` — page d'accueil : Hero BKR + Best-sellers + Collections + Qu'est-ce qu'une Mod ?
- `templates/list-collections.json` — page `/collections` : toutes les familles

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
