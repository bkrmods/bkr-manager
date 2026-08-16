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
| **Montres** | `seiko-mod` | Toutes les montres · Les plus recherchées |
| **Collections** | `/collections` | Seikojust · Dayko · Seikona · Gmteiko · Masterteiko · Seikolus · Seikoak · Santeiko |
| Guides | `/blogs/guides` | — |
| À propos | `/pages/a-propos` | — |

« Montres » regroupe le catalogue et la sélection, « Collections » les
silhouettes. L'entrée s'appelait « Familles » jusqu'au 16 août : **le client ne
veut plus qu'on emploie le mot « famille » côté vitrine**, seulement
« collection ». Renommée via `menuUpdate` — la mutation exige l'arbre complet,
`resourceId` compris, sinon les sous-entrées disparaissent.
Chaque collection n'apparaît **qu'une fois** — deux libellés différents pour une
même URL, c'est ce qui rend un menu illisible.

Arabic Dial et Automatiques NH35 figuraient sous « Montres » comme axes cadran
et mouvement. Le client les a d'abord retirées du menu, puis **fait supprimer
les deux collections** le 16 août. Elles étaient vides, aucun produit n'a changé
de rattachement.

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
| CTA | « Découvrir les montres » (vert) + « Voir les collections » (contour ivoire) |

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

« Choisissez votre style. » : trois cartes éditoriales, une par silhouette.

| Carte | Collection | Accroche |
| --- | --- | --- |
| Dayko | `jour-date` | Guichet du jour et de la date, bracelet à maillons. |
| Seikona | `chronographe-vk63` | Compteurs sur le cadran, poussoirs de part et d'autre de la couronne. |
| Masterteiko | `lunette-tournante` | Lunette tournante graduée, cadran net. |

**Ces trois-là et pas les autres.** La section proposait Arabic Dial,
Chronographes VK63 et Automatiques NH35 ; le client a demandé le 16 août qu'elle
propose des **collections** plutôt qu'un axe cadran ou un axe mouvement. Les
trois retenues sont aussi les seules collections qui ont des produits — donc les
seules dont la carte affiche une vraie photo au lieu d'un placeholder.

Les accroches ont été réécrites en conséquence : elles décrivent ce qu'on voit
sur la montre, pas son calibre. « Compteurs, poussoirs, méca-quartz VK63 » est
devenu « Compteurs sur le cadran, poussoirs de part et d'autre de la couronne » ;
le mouvement se dit ailleurs, dans la section Caractéristiques.

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
| `placement` | `below_image` | voir ci-dessous : `on_image` ne tient pas avec de vraies photos |
| `image_ratio` | `square` | trois portraits côte à côte donnaient des cartes très hautes ; empilées sur 375 px, la page devenait interminable |
| `toggle_overlay` | `false` | le texte n'est plus sur l'image, il n'y a plus rien à voiler |
| `border_radius` | `4` | le rayon de la charte |
| CTA | `style_class: "button-unstyled"` | la carte entière est déjà cliquable ; un gros bouton vert ferait doublon et sortirait le vert de son rôle d'accent |

Le titre de chaque carte vient du bloc natif `collection-title` : il suit le titre
de la collection dans l'admin Shopify. Renommer la collection renomme la carte —
rien à toucher dans le thème.

**`on_image` ne survit pas aux vraies photos.** Tant que les cartes affichaient
le placeholder gris d'Horizon, le texte en surimpression passait : le voile
`#0E0E0ECC` donnait 6,6:1, mesuré sur capture. Dès que les trois collections ont
eu des produits, la carte s'est remplie du premier packshot — fond blanc,
bracelet acier ou or rose — et l'accroche comme « Voir la collection » sont
devenus illisibles. Un dégradé calibré pour un aplat clair uniforme ne rattrape
pas un sujet contrasté.

Le texte est donc passé **sous** l'image : le fond redevient le noir de la
charte, le contraste est celui du reste de la page, et il ne dépend plus de la
photo qui atterrit dans la collection. La page `/collections` était déjà montée
comme ça — les deux grilles se ressemblent maintenant, ce qui n'est pas un
défaut.

**Média** : chaque carte affiche la photo de la collection si elle en a une,
sinon le premier produit, sinon le placeholder Shopify. Aucune image n'est
chargée sur les collections elles-mêmes ; ça se dépose dans l'admin.

## Qu'est-ce qu'une Seiko Mod ? — page d'accueil

Section `_blocks` : un `group` en ligne, bloc `image` à gauche, colonne de texte
à droite, empilés sous 750 px. C'est la section pédagogique du cahier des
charges, et elle porte une partie du SEO de la page d'accueil.

| Bloc | Contenu |
| --- | --- |
| Sur-titre | `LE MODDING` |
| Titre | `<h2>Qu'est-ce qu'une Seiko Mod ?</h2>` |
| Texte | deux paragraphes : ce qui change sur la montre, puis ce que ça produit |
| CTA | « Découvrir les Seiko Mods » → `seiko-mod`, bouton vert |

**C'était une section `media-with-content` ; elle a dû changer de type.** Le
client voulait que toutes les images du site aient des coins arrondis, et
c'était la dernière image carrée de l'accueil. Or `media-with-content` confie
son visuel au bloc statique `_media-without-appearance`, dont le nom est un
avertissement : son schéma n'expose **ni bordure, ni rayon** — type, image,
lien, vidéo, cadrage, rien d'autre. La section, elle, passe bien
`{% render 'border-override', settings: section.settings %}`, mais sur son
propre conteneur : arrondir là aurait rogné les coins de la section entière,
c'est-à-dire deux coins sur quatre du média et rien du tout du côté du texte.

Le bloc `image` d'Horizon, lui, a un `border_radius` — et il applique le style
au `<img>` lui-même, ou au placeholder. D'où le montage en `_blocks` + `group`
en ligne, qui a l'avantage d'être éditable comme n'importe quelle autre section
de la page.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `content_direction` du `group` | `row`, `vertical_on_mobile: true` | deux colonnes au-delà de 750 px, empilées en dessous |
| `custom_width` image et texte | `46` chacun | voir le piège ci-dessous |
| `gap` | `48` | la gouttière entre les deux colonnes |
| `border_radius` de l'image | `12` | le rayon retenu pour toutes les images |
| `image_ratio` | `adapt` | l'image garde ses proportions, pas de recadrage |

**Deux pièges du bloc `image`.**

`width: fill` ne veut pas dire « prends la moitié ». Le snippet `size-style`
traduit `fill` en `--size-style-width: 100%` ; dans un `group` en ligne, les
deux enfants demandent alors 100 % chacun et l'image écrase le texte — la
première capture montrait un titre coupé caractère par caractère sur une colonne
de 170 px. Il faut `width: custom` et un pourcentage.

Le **placeholder** ne remplit pas sa colonne. `.image-block` est un conteneur
flex, et `placeholder-image` n'a pas de largeur intrinsèque : il rétrécit à la
taille de son SVG, quelle que soit la largeur du bloc. Une vraie image, elle, a
des attributs `width`/`height` et se laisse ramener à 100 % du conteneur par le
reset. Autrement dit : cette section a l'air cassée tant qu'aucune image n'est
posée, et se répare toute seule dès qu'il y en a une. Ne pas chercher la panne
ailleurs.

**Sur le texte.** Il décrit ce qu'est une mod — cadran, aiguilles, verre,
lunette, bracelet, réassemblage — sans avancer une seule caractéristique
chiffrée : pas d'étanchéité, pas de calibre, pas de matériau. Ces valeurs se
renseignent produit par produit, via les metafields `bkr.*`.

Il dit aussi qu'une mod « n'est pas une Seiko de série ». C'est une phrase
commerciale honnête, **pas la mention légale de transparence** : celle-là reste
à rédiger et à valider par le client, ce n'est pas un choix de développeur.

**Média** : `dayko-chocolat-or-rose-3.png`, une photo du client — la Dayko
chocolat dans son écrin. Choisie faute de mieux, pour la raison technique
ci-dessus : le placeholder laissait un timbre-poste au milieu du noir. Elle se
remplace en un clic dans l'éditeur, et l'idéal reste un plan serré d'atelier
plutôt qu'un packshot, pour rester dans le registre pédagogique.

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

**Les silhouettes ne sont pas dans la navigation de premier niveau.** Elles
vivent derrière « Collections ». L'en-tête tient
maintenant en quatre entrées — Montres, Collections, Guides, À propos — ce qui compte sur un tiroir mobile où chaque ligne pousse les suivantes
sous la ligne de flottaison. Le menu `bkr-footer-boutique` a suivi la même
logique, pour que le pied de page ne contredise pas l'en-tête.

Aucune collection n'a été supprimée au passage : seuls des liens ont disparu.

La page utilise `collection-list`, gabarit `templates/list-collections.json` :
titre `<h1>Toutes nos collections.</h1>`, sous-titre « Une silhouette par
collection. », puis la grille de cartes.

**Elle utilisait `main-collection-list`, il a fallu en changer.** Le client
voulait retirer de cette page la « Page d'accueil » de Shopify, Best-sellers,
Arabic Dial, Automatiques NH35 et Toutes les Seiko Mods, pour ne garder que les
huit silhouettes. Or `main-collection-list` fait, en dur :

    assign section_collections = collections
    assign max_items = 20

— aucun réglage, aucun filtre : elle rend **toutes** les collections publiées.
Dépublier les cinq indésirables n'était pas une option (le menu « Montres », le
second CTA du Hero et la section Best-sellers en dépendent, et le connecteur
refuse de toute façon `publishableUnpublish`).

`collection-list` a le réglage qui manquait :

    {"type": "collection_list", "id": "collection_list"}

et quand il est renseigné, `max_items = section.settings.collection_list.count`.
Dans le gabarit, la valeur est simplement la liste ordonnée des huit handles.
Le reste est identique : même bloc statique `static-collection-card` de type
`_collection-card`, même `disabled_on` (header et footer seulement), donc la
section est bien autorisée sur ce gabarit.

**Effet de bord** : `frontpage` ne s'affiche plus ici. Elle reste publiée — ce
n'est pas une dépublication, c'est une liste explicite.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `columns` | 3 | quatre cartes par ligne écrasaient les titres |
| `mobile_columns` | 2 (défaut) | deux carrés tiennent bien à 375 px |
| `placement` | `below_image` | le titre sous l'image : plus lisible qu'en surimpression quand il y a une dizaine de cartes |
| `image_ratio` | `square` | même cadrage que les cartes de l'accueil |

**Le plafond de 4 collections du gabarit d'usine n'en était pas un.** Le réglage
`max_collections` n'est lu que par la disposition `editorial` ; en `grid`, la
section boucle sur un `max_items` fixé ailleurs. Le réglage a donc été retiré,
il ne servait à rien.

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

La collection catalogue `seiko-mod` (« Toutes les Seiko Mods ») n'est pas une
famille : c'est la cible du CTA du Hero et de l'entrée de menu « Montres ».

## Page d'une collection — `/collections/<handle>`

Gabarit `templates/collection.json`, qui remplace celui d'usine. Deux sections
seulement : un en-tête `_blocks` et le conteneur natif `main-collection`.

L'en-tête tient en deux blocs `text` branchés sur la collection courante :

    <h1>{{ closest.collection.title }}</h1>
    {{ closest.collection.description }}

`closest.collection` résout bien depuis une section `_blocks` — vérifié en
capture, le titre affiche celui de la collection ouverte et non un gabarit vide.
C'est ce qui permet de n'écrire qu'un seul gabarit pour toutes les collections :
le titre est toujours celui de la page, donc un seul `<h1>`, jamais dupliqué.

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `columns_gap_horizontal` | 12 | même gouttière que la grille de l'accueil |
| `columns_gap_vertical` | 24 | de l'air entre les rangées, comme sur l'accueil |
| `enable_filtering` | `true` | repris du gabarit d'usine |
| `enable_sorting` | `true` | repris du gabarit d'usine |
| `product_card_size` | défaut (`medium`) | non écrit : le défaut convient |
| `mobile_product_card_size` | défaut (`small`) | deux colonnes à 375 px, comme les best-sellers |
| `image_ratio` de la galerie | défaut (`portrait`) | voir ci-dessous |

**`image_ratio: "adapt"` a été retiré des deux gabarits.** Le gabarit d'usine
l'écrivait par-dessus le défaut `portrait` du schéma. Tant que toutes les images
avaient le même format — les placeholders Shopify — ça ne se voyait pas. Les
quatre premières vraies photos font 311×486, 337×486, 375×473 et 400×476 : avec
`adapt`, chaque carte prenait la hauteur de sa propre image, et les quatre
titres se retrouvaient à quatre hauteurs différentes. Le défaut du schéma suffit,
donc la ligne ne se réécrit pas — retirée aussi dans `templates/index.json`, où
le même piège attendait les best-sellers.

Les blocs statiques `filters` et `product-card` gardent **exactement** les
réglages du gabarit d'usine. Leurs schémas font 43 Ko et n'ont pas été lus : on
ne retire pas un réglage dont on n'a pas lu le défaut. Les identifiants
`filters` et `product-card` ne sont pas libres — `main-collection` les appelle
en dur par `content_for 'block', id: '...'`.

**Ce que la page montre aujourd'hui, et qui n'est pas un défaut du gabarit** :
les douze collections étant vides, Horizon affiche « Aucun produit trouvé.
Essayez d'utiliser moins de filtres, ou effacez tous les filtres. » alors
qu'aucun filtre n'est actif. La phrase est une chaîne native d'Horizon, juste
quand un filtre ne renvoie rien, trompeuse quand la collection est vide. La
corriger demanderait de surcharger la traduction, ce qui rendrait le message
faux dans le cas où il est aujourd'hui correct. Elle disparaît au premier
produit ajouté : on la laisse.

### Les descriptions

Écrites le 16 août, à la demande du client, pour les dix collections utiles —
`frontpage` est laissée telle quelle, elle doit disparaître. Elles vivent côté
Shopify (`collectionUpdate`, champ `descriptionHtml`), pas dans le thème : le
bloc `description` du gabarit les rend telles quelles, et le client peut les
réécrire depuis l'admin sans toucher au code.

| Handle | Description |
| --- | --- |
| `seiko-mod` | Le catalogue complet. Chaque montre part d'une base Seiko, change de cadran, d'aiguilles, de lunette ou de bracelet, et repart montée à la main. |
| `chronographe-vk63` | Compteurs sur le cadran, poussoirs de part et d'autre de la couronne. Le mouvement est un méca-quartz VK63. |
| `best-sellers` | Une sélection courte, choisie à la main dans le catalogue. Elle change au fil des arrivages. |
| `classique-date` | Guichet de date, lunette cannelée, bracelet à trois maillons. |
| `jour-date` | Le jour en toutes lettres et la date, sur le même cadran. |
| `double-fuseau` | Une aiguille de plus, une lunette graduée sur 24 heures. |
| `bracelet-integre` | Le bracelet prolonge le boîtier d'un seul tenant, sans cornes apparentes. |
| `octogonale` | Lunette octogonale, vis apparentes, bracelet intégré. |
| `lunette-tournante` | Lunette tournante graduée et cadran net. |
| `boitier-carre` | Boîtier carré aux angles adoucis, vis apparentes sur la lunette. |

**Ce qu'elles ne disent pas, et pourquoi.** Aucune ne cite une étanchéité, un
matériau de boîtier, un type de verre, un diamètre ni une réserve de marche :
ces valeurs ne sont pas confirmées, et une collection est le pire endroit pour
les avancer puisqu'elle couvre plusieurs montres à la fois. Tout ce qui est
écrit se lit sur la photo — un guichet, une lunette, un bracelet, un compteur.

La seule mention de mouvement, le VK63, est sur la collection qui porte déjà ce
nom, et figurait dans les métadonnées SEO validées avant d'être reprise ici.
Il y en avait une deuxième, sur `automatique-nh35`, supprimée avec sa collection
le même jour.

Aucun nom de modèle d'une autre marque n'apparaît. Les silhouettes sont
**décrites** — « lunette octogonale », « bracelet d'un seul tenant », « boîtier
carré aux angles adoucis » — jamais nommées. Les noms de collection choisis par
le client font déjà l'allusion ; la description n'a pas besoin de la souligner,
et c'est autant de risque en moins.

`best-sellers` est le cas délicat : son nom affirme une popularité que rien ne
mesure encore, puisque la boutique n'a pas ouvert. La description ne l'aggrave
pas — elle parle d'une sélection faite à la main, pas de ventes.

Les métadonnées SEO, elles, étaient déjà renseignées pour toutes.

## Fiche produit — `templates/product.json`

Trois sections, dans cet ordre : **retour**, `product-information`,
`product-recommendations`.

### Le lien de retour

Le client voulait « une petite flèche pour revenir en arrière », en pensant au
mobile. C'est une section `_blocks` posée **avant** la galerie, avec un seul
bloc `button` :

| Réglage | Valeur |
| --- | --- |
| `label` | `← Toutes les montres` |
| `link` | `shopify://collections/seiko-mod` |
| `style_class` | `button-unstyled` |

**Horizon n'a rien de natif pour ça.** Ni `blocks/breadcrumbs.liquid`, ni
`blocks/back-link.liquid`, ni `snippets/breadcrumbs.liquid` : aucun de ces
fichiers n'existe dans le thème. Le bloc `button` est ce qui s'en approche le
plus, et la flèche est simplement le premier caractère du libellé — un réglage
de texte, donc modifiable dans l'éditeur sans toucher au code.

**Pourquoi une section à part et pas un bloc dans `_product-details`.** Sur
mobile, `product-information` empile la galerie *au-dessus* des détails : un
lien placé dans `_product-details` serait apparu après une image de 470 px de
haut, c'est-à-dire hors écran — exactement l'inverse de ce qui était demandé.
Une section propre le met au-dessus de tout, sur toutes les largeurs.

**Ce n'est pas un vrai « retour ».** Le lien pointe toujours sur « Toutes les
montres », il ne rejoue pas l'historique du navigateur. C'est volontaire : un
`history.back()` demanderait du JavaScript, et il renverrait n'importe où quand
la fiche est ouverte depuis Instagram ou un résultat Google — c'est-à-dire dans
la majorité des visites attendues.

### Le reste du gabarit

Galerie en carrousel, vignettes sous l'image en desktop et points en mobile,
format portrait `1/1.25`, **zoom plein écran coupé** (`zoom: false`) — les trois
à la demande du client. Recommandations sous le titre « Dans le même esprit. ».

## Images arrondies

Le client voulait que **toutes les images flottent sur le noir**. Le rayon est
donc à **12 px** partout, posé sur les blocs image et non sur du CSS :

| Bloc | Réglage | Où |
| --- | --- | --- |
| `_product-card-gallery` | `border_radius: 12` | accueil, grille de collection, recommandations |
| `_collection-card-image` + `collection-card` | `border_radius: 12` | cartes de l'accueil et `/collections` |
| `_product-media-gallery` | `media_radius: 12` | image principale de la fiche |
| `_product-media-gallery` | `thumbnail_radius: 8` | vignettes, plus petites donc rayon plus faible |

**Le piège de `media_radius`.** Il n'arrondit pas l'image : il arrondit le
conteneur du carrousel. Tant que `constrain_to_viewport` était à `true`,
l'image était plus étroite que ce conteneur, et les coins arrondis tombaient
dans le noir, à côté de l'image, invisibles — le réglage semblait sans effet.
En le passant à `false`, l'image remplit la colonne et épouse les coins.
Diagnostiqué en lisant le `border-radius` calculé le long des parents de
l'image : seul `SLIDESHOW-CONTAINER` portait les 12 px.

Le Hero n'est pas arrondi : il est plein écran et bord à bord, un rayon y
créerait des coins noirs dans un fond noir.

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

## Voir le rendu

Toute la QA du projet est **structurelle** : les schémas sont lus, les valeurs
vérifiées, les tailles comparées à l'octet — mais personne n'a regardé la page.
Le chevron invisible du menu est ce que ça coûte : une configuration
parfaitement correcte, et une fonctionnalité que personne ne trouve.

`horizon/apercu.mjs` capture le thème de dev à 375, 390, 430 et 1440 px.

    npm i -D playwright
    BKR_MDP=<mot de passe boutique> node horizon/apercu.mjs / /collections

Chromium est **déjà** dans l'environnement (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`) :
ne jamais lancer `playwright install`. Seul le pilote npm manque — et **sa
version doit correspondre au Chromium installé**, sinon il en réclame un autre
et refuse de démarrer. Le build 1194 présent va avec `playwright@1.56.0` ; en
cas de doute, comparer avec le `browsers.json` de la version visée.

Le script déverrouille la vitrine protégée, charge chaque page en aperçu du
thème de dev, la parcourt de haut en bas pour forcer l'hydratation des sections
d'Horizon — sans ce défilement tout ce qui est sous la ligne de flottaison est
capturé vide — puis écrit les PNG dans `captures/`, ignoré par git.

**Il tourne depuis le 15 août 2026** : le réseau vers la vitrine a été ouvert.
Cinq obstacles ont dû être levés, tous documentés dans le script — les retenir
évite de les rediagnostiquer.

1. **Chromium ne passe pas le proxy de la session.** Son ClientHello embarque
   une clé post-quantique (~1,8 ko) qu'aucun `--disable-features` ne retire
   depuis Chromium 141, et le tunnel se fait couper : `ERR_CONNECTION_RESET` sur
   tout, y compris `example.com`. La pile réseau de Node, elle, passe. Chaque
   requête est donc détournée vers `context.request` : Chromium ne fait plus de
   TLS, il ne reçoit que des réponses déchiffrées.
2. **Le relais doit suivre les redirections lui-même.** Une fois qu'on a servi
   une 3xx à Chromium, la requête suivante de la chaîne ne repasse plus par le
   détournement et part en direct — donc elle casse. Conséquence : `page.url()`
   reste sur l'URL demandée. C'est le contenu de la page qui fait foi, jamais
   son URL.
3. **Le formulaire de mot de passe est dans une `<dialog>`.** Le champ existe
   dès le chargement mais reste invisible tant qu'on n'a pas cliqué « Accéder
   avec le mot de passe ». Et le déverrouillage se vérifie en **cherchant
   l'en-tête du thème**, jamais en constatant l'absence du champ : cette
   `<dialog>` est peuplée par un script, donc un test lancé trop tôt compte zéro
   champ et conclut que tout va bien. Un contexte est reparti verrouillé sans
   que rien ne le signale, et ses quatre captures montraient « Opening soon ».
4. **Au-delà de 990 px, ce n'est pas le document qui défile** mais
   `.page-wrapper` : `html` et `body` sont en `overflow: hidden`. Une capture
   pleine page s'arrête alors au premier écran — c'est ce qui rendait les vues
   1440 inutilisables, on ne voyait que le Hero.
5. **Horizon pose `content-visibility: auto`** sur quelques conteneurs, dont
   celui des menus du pied de page : le navigateur saute le rendu de ce qui est
   loin de la fenêtre, la capture les sort vides et le conteneur s'écrase à
   quelques pixels, la section suivante passant par-dessus. L'en-tête est exclu
   du correctif : ses panneaux de méga-menu portent le même réglage, et les
   forcer revient à déplier le menu.

Deux habillages sont retirés avant de déclencher : la barre d'aperçu Shopify
(`#PBarNextFrameWrapper`), qui recouvre le haut de la page — c'est elle qui
rognait les accents du premier titre et faisait croire à une faute — et le
bandeau de consentement aux cookies, qui masque le Hero entier sur mobile.

Le retour en haut doit être **sec** (`scroll-behavior: auto`) : le thème défile
en douceur, et une capture déclenchée pendant l'animation fige l'en-tête collant
au milieu de l'image.

Le mot de passe passe par l'environnement, jamais par le disque : il n'a rien à
faire dans le dépôt.

## Fichiers versionnés

- `config/settings_data.json` — design system BKR (palette, boutons, rayons, badges, logo)
- `assets/bkr.css` — une règle : rendre visible le chevron des sous-menus
- `snippets/stylesheets.liquid` — une ligne ajoutée pour charger `bkr.css`
- `sections/header-group.json` — en-tête : menu `bkr-main`, annonce en français, sélecteurs coupés
- `sections/footer-group.json` — 4 colonnes de menu, politiques, réseaux sociaux vidés
- `templates/index.json` — page d'accueil : Hero BKR + Best-sellers + Collections + Qu'est-ce qu'une Mod ?
- `templates/list-collections.json` — page `/collections` : les huit silhouettes
- `templates/product.json` — fiche produit : lien de retour, galerie, détails, recommandations
- `templates/collection.json` — page d'une collection : titre, description, grille filtrable

## Collections Shopify

| Handle | Titre | Rôle |
| --- | --- | --- |
| `seiko-mod` | Toutes les Seiko Mods | catalogue complet |
| `best-sellers` | Les plus recherchées | sélection manuelle, ordre réglé à la souris |

Toutes sont manuelles et publiées sur la boutique en ligne.

**Deux collections ont été supprimées le 16 août**, à la demande du client :
`arabic-dial` (axe cadran) et `automatique-nh35` (axe mouvement). Toutes deux
étaient vides, donc aucun produit n'a changé de rattachement, et une seule chose
pointait encore dessus — le second CTA du Hero, rebranché sur `/collections`
avant la suppression.

Le coût est ailleurs : `seiko arabic dial` et `mouvement nh35` sont deux
mots-clés prioritaires du projet, et ces collections étaient leurs pages
d'atterrissage. Il n'en reste aucune. Le sujet peut revenir sous forme d'article
dans le blog `guides` ou de filtre sur `seiko-mod` — mais **ne pas recréer les
collections de sa propre initiative**, la demande était explicite et répétée.
