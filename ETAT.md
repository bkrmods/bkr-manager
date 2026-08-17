# BKR Mods — état du projet

Note de reprise. Ce fichier est chargé automatiquement par `CLAUDE.md` : une
nouvelle session sait donc où on en est sans qu'on ait à le lui raconter.

**À tenir à jour à chaque fin de séance.** Dernière mise à jour : 16 août 2026,
après la série de retouches demandée par le client (vocabulaire « collection »,
tri de `/collections`, cartes de l'accueil, dernière image arrondie, lien de
retour sur la fiche produit, Best-sellers renommée, descriptions de collection,
suppression d'`arabic-dial` et `automatique-nh35`, animations rallumées).

## Le projet en cinq lignes

BKR Mods (bkrmods.fr) vend des montres Seiko modifiées. Boutique Shopify
premium, SEO-first, mobile-first (375 / 390 / 430 px), environ 80 % de visuel
pour 20 % de texte. Socle : **Horizon**. Tout doit rester modifiable depuis
l'éditeur Shopify — le client ne veut pas appeler un développeur pour changer une
phrase.

Ordre de préférence, jamais l'inverse : **natif Horizon → réglage à ajuster →
gabarit JSON → section sur mesure.**

## Identifiants

| | |
| --- | --- |
| Thème de dev (écrire ici) | `gid://shopify/OnlineStoreTheme/186469122384` — « BKR — dev (Horizon) », `UNPUBLISHED` |
| Thème live (ne pas toucher) | `gid://shopify/OnlineStoreTheme/186380222800` — « Horizon », `MAIN` |
| Branche git | `claude/bkrmods-responsive-preview-le1sgn` (part de `claude/bkrmods-color-legal-pages-jwtyai`) |
| Miroir des fichiers modifiés | `horizon/` (voir `horizon/README.md`) |

Le thème live n'a pas bougé depuis le **2026-08-09T19:00:02Z**. Vérifier son
`updatedAt` après chaque série d'écritures.

### Collections

| Handle | Titre | Axe |
| --- | --- | --- |
| `seiko-mod` | Toutes les Seiko Mods | catalogue |
| `chronographe-vk63` | Seikona | silhouette (Daytona) |
| `best-sellers` | Les plus recherchées | sélection manuelle |
| `classique-date` | Seikojust | silhouette (Datejust) |
| `jour-date` | Dayko | silhouette (Day-Date) |
| `double-fuseau` | Gmteiko | silhouette (GMT-Master II) |
| `bracelet-integre` | Seikolus | silhouette (Nautilus) |
| `octogonale` | Seikoak | silhouette (Royal Oak) |
| `lunette-tournante` | Masterteiko | silhouette (Yacht-Master) |
| `boitier-carre` | Santeiko | silhouette (Santos) |

**`arabic-dial` et `automatique-nh35` ont été supprimées** le 16 août, à la
demande du client — deuxième demande, la première avait été comprise comme un
simple retrait de la page `/collections`. Les deux étaient vides, aucun produit
n'a donc changé de rattachement. Le seul lien qui pointait encore dessus était
le **second CTA du Hero**, rebranché sur `/collections` (« Voir les
collections ») avant la suppression.

Ce que ça coûte, et il faut le savoir : `seiko arabic dial` et `mouvement nh35`
figurent parmi les mots-clés prioritaires du projet, et ces deux collections
étaient leurs pages d'atterrissage. Le sujet peut revenir plus tard sous forme
d'article de blog ou de filtre, sans recréer de collection.

Les dix collections restantes sont **publiées** sur « Boutique en ligne » et
« Shop ». Quatre ne l'étaient pas au départ, et c'est ce qui faisait afficher
« Titre de la collection » sur deux cartes de l'accueil et pointer dans le vide
le menu « Montres ». Réparé le 15 août.

**Six produits en ligne** (15 août), tous à **190 €**, tous publiés sur
« Boutique en ligne » et « Shop », tous dans `seiko-mod` :

| Produit | Famille |
| --- | --- |
| Dayko — cadran noir | `jour-date` |
| Dayko — cadran bleu roi | `jour-date` |
| Dayko — cadran olive | `jour-date` |
| Dayko — cadran chocolat, or rose | `jour-date` |
| Seikona — cadran météorite | `chronographe-vk63` |
| Masterteiko — or rose, lunette noire | `lunette-tournante` |

Les **descriptions restent vides** : rien ne s'écrit sans les caractéristiques
du fournisseur.

Le Drive est organisé en huit dossiers, un par famille. Les photos livrées en
second (≈1120 × 1400 px) sont exploitables ; les quatre premières (311 à 400 px)
ne le sont pas vraiment et mériteraient d'être remplacées quand le client aura
les mêmes vues en grand pour les trois Dayko restantes.

`Dayko — cadran noir` s'était retrouvée d'office dans la collection `frontpage`
de Shopify ; elle en a été retirée, sinon « Page d'accueil » affichait une vraie
montre sur `/collections` et passait pour une famille.

**Les noms de famille ont été choisis par le client.** Ils combinent la marque
Seiko et des noms de modèles protégés (Rolex, Patek Philippe, Audemars Piguet).
Le risque juridique lui a été exposé en détail, avec une série de noms de
remplacement ; il a maintenu son choix. **Ne pas revenir dessus de sa propre
initiative** — le raisonnement complet est dans `horizon/README.md`.

Les handles restent descriptifs : le nom s'affiche, l'URL décrit la montre.

### Menus

`bkr-main` (en-tête) · `bkr-footer-bkr` · `bkr-footer-boutique` ·
`bkr-footer-assistance` · `bkr-footer-informations`

En-tête, menu à deux niveaux : **Montres** (toutes les montres, les plus
recherchées) · **Collections** (les huit silhouettes) · Guides · À propos.
Horizon en fait un méga-menu tout seul, et un accordéon dans le tiroir mobile.

**On ne dit plus « famille », on dit « collection »** (demande du client, 16
août). Le mot a été changé dans l'entrée de menu `bkr-main`, dans le titre de
`/collections` et dans le sous-titre de l'accueil. Il reste employé dans les
notes ci-dessous et dans `horizon/README.md` au sens de « groupe de
silhouettes » ; c'est du vocabulaire interne, pas de l'affichage.

## Charte

Noir profond `#0E0E0E` · Blanc cassé `#F3F3F1` · Vert Racing `#1C5A4B`.
Premium, minimaliste, moderne. Sans doré, sans chrome, sans effet flashy.
**Le vert est un accent, jamais la couleur dominante, et il ne porte jamais de
texte** (2,4:1 sur noir — illisible).

Tout passe par `settings.color_palette` d'Horizon. Aucun CSS parallèle.
Détail dans le skill `bkr-charte` et dans `horizon/README.md`.

## Fait

- **Design system** — palette, boutons, rayons (4), badges, logo. Le preset
  d'usine `presets.Horizon` est conservé intact dans `settings_data.json` :
  c'est le retour arrière en un clic.
- **En-tête** — logo, menu `bkr-main`, annonce en français, sticky, transparent
  au-dessus du Hero. Sélecteurs pays et langue coupés (un seul marché, une seule
  langue).
- **Pied de page** — quatre colonnes de menu repliables en accordéon sur mobile,
  bloc natif des politiques Shopify, Instagram et TikTok renseignés (URL
  nettoyées de leurs paramètres de suivi), les autres réseaux vides.
- **Accueil / Hero** — plein écran, un seul `<h1>`, deux CTA, overlay dégradé.
  Second CTA rebranché sur `/collections` le 16 août, la collection qu'il
  visait ayant été supprimée.
  Image en place depuis le 15 août : `bkr-hero-ecrins.png` en desktop, et un
  **cadrage portrait de la même image** en mobile (`image_1_mobile`, avec
  `custom_mobile_media: true`). Sans ce second cadrage, le `cover` d'Horizon ne
  gardait que du bois : ni dégradé vert, ni écrin BKR.
- **Accueil / Best-sellers** — `product-list` sur la collection manuelle
  `best-sellers`, carrousel sous 750 px. La collection s'appelle **« Les plus
  recherchées »** depuis le 16 août (le handle, lui, ne bouge pas) : le client
  voulait que le nom affiché dans les menus soit celui du titre de la section.
- **Accueil / Collections** — « Choisissez votre style. », trois cartes
  éditoriales natives (`collection-card` accepte `text`, `button`, `group`,
  `collection-title` comme enfants) dans une section `_blocks`. Depuis le 16
  août elles pointent sur **trois silhouettes** — Dayko, Seikona, Masterteiko —
  et non plus sur des axes de mouvement ou de cadran : le client ne voulait
  « ni NH35, ni Arabic Dial, ni chronographe » à cet endroit. Ce sont aussi les
  trois seules collections qui ont des produits, donc les seules dont la carte
  affiche une vraie photo.
  Le texte est passé **sous l'image** (`placement: below_image`, voile coupé) :
  en `on_image`, l'accroche et « Voir la collection » tombaient sur un bracelet
  clair et devenaient illisibles dès que les cartes ont eu de vraies photos.
- **Accueil / Qu'est-ce qu'une Seiko Mod ?** — section `_blocks` : un `group` en
  ligne, bloc `image` à gauche (46 %, rayon 12 px), colonne de texte à droite
  (46 %), empilés sous 750 px. C'était une section `media-with-content` ; elle a
  été remplacée parce que son bloc `_media-without-appearance` **n'a aucun
  réglage de bordure** — c'était la dernière image carrée de l'accueil, et le
  seul moyen natif de l'arrondir était de changer de section.
  Deux pièges du bloc `image` : `width: fill` ne partage pas la ligne, il faut
  un `custom_width` en pourcentage ; et le **placeholder** ne remplit pas sa
  colonne (il n'a pas de largeur intrinsèque, il rétrécit à son SVG). Une vraie
  image, elle, la remplit. D'où le choix de `dayko-chocolat-or-rose-3.png`,
  photo du client montrant une mod finie dans son écrin — remplaçable en un clic
  dans l'éditeur.
- **Accueil / Caractéristiques** — « Sur chaque montre. », trois points
  (assemblage, mouvements, paiement). Volontairement trois et pas six : les
  autres auraient été des promesses non confirmées.
- **Accueil / Newsletter** — bloc natif `email-signup`, bouton intégré au champ,
  centrée. Aucune promesse de remise ni de fréquence.
- **Gabarit produit** — `templates/product.json`. Galerie en **carrousel** avec
  vignettes sous l'image (desktop) et points (mobile), format portrait fixe
  `1/1.25`, et **zoom plein écran coupé** (`zoom: false`) — les trois à la
  demande du client. Le bloc `disclosures` vide et son titre anglais ont été
  retirés, et « You may also like » est devenu « Dans le même esprit. ».
  Depuis le 16 août, une section `_blocks` **« retour »** est posée tout en haut
  du gabarit, avant la galerie : un simple bouton `button-unstyled` intitulé
  « ← Toutes les montres ». Horizon n'a **ni bloc fil d'Ariane ni bloc lien de
  retour** (`blocks/breadcrumbs.liquid`, `blocks/back-link.liquid`,
  `snippets/breadcrumbs.liquid` : aucun n'existe), et le mettre dans
  `_product-details` l'aurait envoyé sous la galerie sur mobile — c'est-à-dire
  hors d'atteinte, à l'inverse de ce qui était demandé.
- **Gabarit de collection** — `templates/collection.json`, un seul gabarit pour
  les douze : en-tête `_blocks` branché sur `closest.collection` (titre en
  `<h1>` + description), puis `main-collection` avec filtres et tri natifs.
  Vérifié en capture aux quatre largeurs sur `/collections/jour-date` et
  `/collections/boitier-carre`.
- **Page `/collections`** — `templates/list-collections.json` ne rend plus que
  les **huit silhouettes**. Elle affichait les douze collections plus la
  « Page d'accueil » de Shopify ; le client voulait retirer Page d'accueil,
  Best-sellers, Arabic Dial, Automatiques NH35 et Toutes les Seiko Mods (les
  deux du milieu ont depuis été supprimées tout court).
  La section a dû **changer de type** : `main-collection-list` fait
  `assign section_collections = collections` avec `max_items = 20` en dur — elle
  rend toutes les collections publiées, sans le moindre réglage pour en choisir.
  `collection-list` a, lui, un `{"type": "collection_list"}` : c'est la liste
  des huit handles, dans l'ordre, dans le gabarit. Titre passé à « Toutes nos
  collections. », sous-titre à « Une silhouette par collection. »
  **Effet de bord bienvenu** : la collection `frontpage`, que le connecteur
  refuse de dépublier, ne s'affiche plus ici. Elle reste publiée côté Shopify —
  le geste à faire côté client tient toujours.
- **Descriptions de collection** — les dix collections utiles en ont une depuis
  le 16 août (`frontpage` a été laissée de côté, elle doit disparaître ; deux
  autres ont été écrites puis supprimées avec leur collection le jour même). Deux ou
  trois phrases chacune, dans le bloc `description` du gabarit de collection.
  Elles décrivent **une silhouette et un usage**, jamais une caractéristique :
  ni étanchéité, ni matériau de boîtier, ni type de verre, ni diamètre — rien
  qui viendrait d'ailleurs que de ce qu'on voit sur la photo. Les seuls
  mouvements cités sont NH35 et VK63, sur les deux collections qui portent leur
  nom, et ils l'étaient déjà dans les métadonnées SEO validées.
  Aucun nom de modèle d'une autre marque : les silhouettes sont décrites
  (« lunette octogonale », « bracelet d'un seul tenant »), jamais nommées.
  Sur `best-sellers`, la description **ne dit rien du nombre de ventes** — le nom
  de la collection est une décision du client, ce n'est pas une raison pour
  ajouter un chiffre qu'on n'a pas.
- **Images arrondies** — rayon 12 px sur toutes les images (cartes produit,
  cartes de collection, image principale de la fiche), 8 px sur les vignettes.
  Le Hero reste bord à bord. Détail et piège de `media_radius` dans
  `horizon/README.md`.
- **Aperçu visuel** — `horizon/apercu.mjs` tourne enfin : le réseau vers la
  vitrine est ouvert. Captures aux quatre largeurs dans `captures/`.
- **Contraste des cartes de collection** — le voile est passé de `#0E0E0EA6` à
  `#0E0E0ECC`. Mesuré sur la capture : 4,21:1 avant, 6,6:1 après. En dessous de
  4,5:1 l'accroche et le lien « Voir la collection » n'étaient pas conformes.
  Le Hero garde `A6`, il est déjà entre 5,6 et 7,1:1.
- **Animations** — le groupe « Animations » d'Horizon était **entièrement
  désactivé** sur ce thème, alors qu'il est actif par défaut à l'installation.
  Rallumé le 16 août, à la demande du client (« fluidifie le site ») :
  `page_transition_enabled` et `transition_to_main_product` à `true`,
  `card_hover_effect` à `subtle-zoom`. Deux autres étaient déjà actifs par
  défaut sans avoir été écrits : `add_to_cart_animation` et
  `show_second_image_on_hover`.
  Tout est conforme au skill `bkr-charte` : rien ne bouge sans geste de
  l'utilisateur, aucun fond animé, aucune ombre portée, et les transitions de
  page sont derrière `prefers-reduced-motion`.
  Le preset `presets.Horizon` garde ses valeurs coupées : le retour arrière
  reste en un clic.
- **Panier** — `cart_type` était déjà `drawer`. Ajouté : `auto_open_cart_drawer`
  (le tiroir s'ouvre à l'ajout, l'action a enfin un résultat visible) et
  `cart_thumbnail_border_radius: 12`, les vignettes du panier étant les
  dernières images carrées du site.
- **Metafields** `bkr.*` créés, avec la consigne « ne pas inventer » dans leur
  description.
- **Trois skills** dans `.claude/skills/` : `bkr-charte`, `horizon-section`,
  `bkr-garde-fous`.

## Reste à faire

**Page d'accueil**, dans l'ordre du cahier des charges §15 :

1. ~~La Sélection BKR~~ — **abandonnée** : le client n'en veut pas (16 août)
2. Every detail matters (vidéo) — **bloquée**, aucune vidéo dans la bibliothèque
3. Guides SEO — **bloquée**, le blog `guides` n'a pas encore d'articles
4. Avis clients — **section à laisser masquée** tant qu'il n'y a pas de vrais avis
5. Réseaux sociaux — Instagram et TikTok sont dans le pied de page. Une section
   dédiée sur l'accueil reste possible, elle n'a pas été demandée.

**Mention RGPD sous le champ newsletter** : consentement + lien vers la politique
de confidentialité. Obligatoire pour une collecte d'e-mails, mais c'est un texte
juridique — à faire rédiger, pas à inventer.

L'ordre des sections se règle à la souris dans l'éditeur : construire dans le
désordre ne coûte rien.

### La Sélection BKR — abandonnée

Le paragraphe §15 du cahier des charges n'est plus dans le dépôt, et le nom
seul était ambigu : une deuxième grille de produits, ou la mise en avant d'une
seule montre ? La question a été posée au client le 16 août, **il n'en veut
pas**. Ne pas la reproposer.

**Ensuite** : gabarit produit réutilisable, puis QA.

Le gabarit de collection est fait. Une chose l'attend encore, côté contenu :

- **« Aucun produit trouvé. Essayez d'utiliser moins de filtres »** s'affiche sur
  les collections vides, alors qu'aucun filtre n'est actif. Chaîne native
  d'Horizon, correcte quand un filtre ne renvoie rien. Elle disparaît au premier
  produit — ne pas la surcharger.

### Menu et panier — compacter, pas encore fait

Le client a tranché le 16 août : **panneau de méga-menu compact** sur desktop,
**écart de tailles réduit** dans le tiroir mobile, **tiroir de panier moins
envahissant**. Rien de tout cela n'a abouti, et il faut savoir pourquoi avant
d'y retourner.

**Aucun des trois n'a de réglage natif.** Vérifié dans le schéma du bloc
`_header-menu` et dans `settings_schema.json` :

- La taille des entrées de premier niveau du tiroir est écrite en dur :
  `--menu-top-level-font-size: var(--font-size--xlarge)`. Le réglage
  `menu_font_style` **ne la touche pas** — malgré son nom, son libellé de schéma
  est `t:settings.submenu_size`, il ne pilote que le sous-menu (essayé en
  `regular`, seules les sous-entrées ont changé ; remis à `inverse`).
- Le panneau de méga-menu en `menu_style: "text"` occupe toute la largeur par
  construction. Les trois autres valeurs (`collection_images`,
  `featured_products`, `featured_collections`) sont plus riches, pas plus
  compactes.
- Le groupe « Tiroirs » des réglages de thème ne propose que trois couleurs.

**Une tentative en CSS a été faite puis annulée.** Deux erreurs à ne pas
refaire :

1. `--theme-drawer-width` ne fixe **pas** la largeur du tiroir : elle ne sert
   qu'au décalage de la page (`.page-wrapper--drawer-open { margin-right }`).
   La réduire fait recouvrir le contenu par le tiroir au lieu de le rétrécir —
   vérifié en capture, le titre du produit et le bouton PayPal passaient sous
   le panneau. La largeur réelle vient de `--sidebar-width`, qui sert **aussi**
   à la colonne de filtres des collections : la changer globalement casserait
   les pages de collection.
2. Les entrées du tiroir mobile ne sont pas `.menu-list__link` mais
   `.menu-drawer__menu-item` (relevé dans le DOM). Le sélecteur visé ne
   correspondait à rien.

`assets/bkr.css` est donc revenue à sa règle unique. La prochaine tentative
part de ces deux corrections, et se vérifie avec `horizon/etats.mjs`.

## Bloqué, en attente du client

| Quoi | Pourquoi ça bloque |
| --- | --- |
| **Descriptions des six fiches** | vides. Rien ne sera écrit sans les caractéristiques du fournisseur — pas de mouvement, d'étanchéité ni de matériau inventés. Le cadran du Masterteiko affiche « 300m » : ce n'est pas une source, ça ne se recopie pas en étanchéité. |
| **Origine de l'image du Hero** | le fichier déposé s'appelle « ChatGPT Image 16 août 2026 » : c'est un **rendu génératif**, pas une photo. Il montre un écrin siglé BKR et des montres qui ne sont pas celles du catalogue. Le client l'a fourni pour cet usage ; le point lui a été signalé une fois. Les garde-fous interdisent « les rendus générés présentés comme des photos » — à re-trancher avec lui avant l'ouverture publique. |
| **Qualité des premières photos** | les quatre PNG livrés en premier font 311 à 400 px de large, pour ~2000 px attendus. Trois sont encore en ligne (Dayko noir, bleu roi, olive). Le second envoi est à ≈1120 × 1400 px, exploitable. Elles portent aussi un filigrane d'un tiers, et le cadran affiche « OYSTER PERPETUAL », « DAY-DATE » et « SUPERLATIVE CHRONOMETER OFFICIALLY CERTIFIED » sous le logo Seiko. Le client a demandé de les mettre en place malgré le filigrane ; il n'a pas répondu sur le texte du cadran. **Ne pas relancer de soi-même, mais ne pas non plus considérer le sujet comme tranché.** |
| **Photos** | Hero et cartes de collection affichent toujours les placeholders Shopify. Les contrastes mesurés le sont donc sur des images bouche-trou très claires — c'est le pire cas, ce qui va dans le bon sens. |
| **`best-sellers` est vide** | la collection n'a **aucun produit**, et la section « Les plus recherchées. » de l'accueil affiche donc son titre puis un grand trou noir — vérifié en capture le 16 août aux quatre largeurs. Ce n'est pas un bug du gabarit : Horizon ne rend rien quand la collection choisie est vide. Le client a tranché le 16 août : **on garde la collection**, renommée « Les plus recherchées » (handle inchangé). Reste à **choisir les montres qui y entrent** — c'est sa décision, pas la nôtre : y verser d'office les six reviendrait à appeler « les plus recherchées » des produits qui n'ont pas encore été vendus une seule fois. Deux suffisent à combler le trou. |
| **Page « Politique d'expédition »** | elle n'existe pas. Ne pas la rédiger — c'est un texte juridique. |
| **URL des réseaux sociaux** | champs volontairement vides. |
| **Semrush** | à ré-authentifier. |
| **Collection `frontpage` à dépublier** | Shopify crée d'office une collection « Page d'accueil », vide. Elle **ne s'affiche plus sur `/collections`** depuis le 16 août (la page ne liste que les huit handles choisis), mais elle reste **publiée** : son URL répond, et elle ressortira partout où l'on branchera une liste automatique. `publishableUnpublish` a été retenté deux fois : le connecteur le refuse par politique (« Unpublishing is blocked »), ce n'est pas un incident réseau. **Seul geste possible, côté client** : Collections → Page d'accueil → Publication → décocher « Boutique en ligne ». |

## Règles absolues

Le détail est dans le skill `bkr-garde-fous`. L'essentiel :

- **Ne jamais publier un thème.** Écrire uniquement sur le thème de dev, et
  vérifier son rôle avant toute série d'écritures.
- **Ne pas toucher** : paiements, paramètres financiers, domaine, commandes,
  clients, fiscalité, applications — sans demande explicite.
- **Ne jamais inventer** : étanchéité, matériaux, mouvement, réserve de marche,
  certification, provenance, garantie, partenariat. **Jamais 904L par défaut.**
- **Aucun faux avis, aucune note, aucune étoile, aucun compteur** tant qu'il n'y
  a pas d'avis vérifiables.
- **Aucune image prise sur internet**, aucune photo de concurrent, aucun faux
  visuel produit. Placeholders Shopify uniquement.
- **Ne pas rédiger de pages légales** qui n'existent pas encore : les signaler.
- moddys-watches.com sert de repère pour la **logique e-commerce** uniquement —
  jamais le code, les textes, les images, le logo, les couleurs ou la mise en page.
- BKR est **indépendante de Seiko**. Pas de nomenclature d'une autre marque.
- **Le client tranche les décisions d'autorisation lui-même** : il a demandé à
  plusieurs reprises qu'on avance sans lui poser de questions de validation
  intermédiaires.

## Reprendre dans un nouveau chat

Ouvrir une session sur ce dépôt suffit : `CLAUDE.md` charge `AGENTS.md` et ce
fichier, et les skills de `.claude/skills/` sont détectés automatiquement.

Un premier message du type « on reprend le projet BKR, section suivante de
l'accueil » est assez. Pour vérifier que le contexte est bien passé, demander sur
quel thème on écrit : la bonne réponse est `186469122384`, `UNPUBLISHED`.
