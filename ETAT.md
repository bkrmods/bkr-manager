# BKR Mods — état du projet

Note de reprise. Ce fichier est chargé automatiquement par `CLAUDE.md` : une
nouvelle session sait donc où on en est sans qu'on ait à le lui raconter.

**À tenir à jour à chaque fin de séance.** Dernière mise à jour : 4 septembre
2026, au changement de thème de travail.

**⚠ On a changé de thème de dev.** Le client a fait corriger le thème hors de ce
dépôt et demande qu'on travaille désormais sur
**`theme-bkrmods-corrige-horizon`**. Le miroir `horizon/` a été **resynchronisé
depuis ce thème** ; il ne reflète plus « BKR — dev (Horizon) », qui est gelé.
Ce que la correction a changé est listé plus bas, section « Ce que le thème
corrigé a changé » — **le relire avant d'écrire quoi que ce soit sur l'accueil
ou la fiche produit**, sous peine de réintroduire des phrases qui ont été
retirées pour de bonnes raisons.

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
| Thème de dev (écrire ici) | `gid://shopify/OnlineStoreTheme/186548322640` — « theme-bkrmods-corrige-horizon », `UNPUBLISHED` |
| Ancien thème de dev (gelé) | `gid://shopify/OnlineStoreTheme/186469122384` — « BKR — dev (Horizon) », `UNPUBLISHED`. Ne plus y écrire. |
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

## Ce que le thème corrigé a changé

Relevé le 4 septembre par comparaison champ par champ entre l'ancien thème de
dev et `theme-bkrmods-corrige-horizon`. Ce ne sont pas des retouches de style :
**la plupart corrigent des affirmations fausses que j'avais écrites.** Ne pas
les défaire.

### Le modèle de l'entreprise, tel qu'il est maintenant écrit

BKR Mods **ne monte pas les montres**. Le site dit désormais : BKR vérifie la
commande, puis **un atelier fournisseur assemble et expédie** la montre, en
**9 à 10 jours ouvrés en général, dans la limite de 15 jours**. C'est le fait à
retenir — mes textes précédents parlaient d'un montage « à la main », « à
l'unité », ce qui laissait croire à un atelier BKR.

| Où | Avant (à moi, faux ou trop large) | Après (corrigé) |
| --- | --- | --- |
| Barre d'annonce | LIVRAISON SUIVIE • PAIEMENT SÉCURISÉ • COMMANDES PRÉPARÉES AVEC SOIN | ASSEMBLÉES À LA COMMANDE • PAIEMENT SÉCURISÉ • 9 À 10 JOURS OUVRÉS EN GÉNÉRAL — **remplacée depuis** par trois messages tournants, voir « Fait / Barre d'annonce » |
| Accueil / Caractéristiques | « Assemblée à la main » — « Chaque pièce est choisie, puis la montre est montée à l'unité. » | « Assemblées à la commande » — « BKR Mods vérifie chaque commande, puis notre atelier fournisseur assemble et expédie la montre. » |
| Accueil / Caractéristiques | « Mouvements NH35 et VK63 » — « les deux mouvements sur lesquels repose le catalogue » | « Mouvements éprouvés » — « Automatique ou méca-quartz selon le modèle, avec la référence précisée sur chaque fiche. » |
| Accueil / Qu'est-ce qu'une Seiko Mod ? | texte sur une base Seiko remontée pièce par pièce | texte sur l'assemblage à la commande par l'atelier fournisseur, à partir de composants sélectionnés |

La deuxième ligne du tableau réglait un vrai problème : affirmer un montage
maison quand l'assemblage est sous-traité, c'est exactement le genre de phrase
que le skill `bkr-garde-fous` interdit. La troisième évite d'annoncer deux
calibres pour tout le catalogue.

### Les autres changements

- **Section « Les plus recherchées. » → « Nos modèles disponibles. »**, et elle
  pointe maintenant sur `seiko-mod` et non plus sur `best-sellers`. C'est la
  bonne réponse au trou noir que j'avais signalé : plutôt que de remplir une
  sélection « les plus recherchées » avec des montres jamais vendues, on dit ce
  qui est vrai — voilà ce qui est disponible. **La collection `best-sellers`
  n'est donc plus branchée nulle part.**
- **`/collections` ne liste plus que trois collections** : `jour-date`,
  `chronographe-vk63`, `lunette-tournante` — les trois qui ont des produits.
  Les cinq vides ont été retirées de la liste. Elles existent toujours et
  peuvent revenir dans `collection_list` dès qu'elles auront des montres.
- **Zoom plein écran rétabli sur la fiche produit** (`zoom: true`). Le client
  l'avait fait couper en août ; c'est un choix qui a été repris, ne pas le
  recouper de sa propre initiative.
- **Corps de texte : 14 → 16 px** (`type_size_paragraph`), dans `current` et
  dans le preset.

### Deux blocs Liquid sur mesure, à connaître

Ce sont les premiers fichiers `.liquid` créés pour ce projet. Tous deux sont
posés dans `_product-details` sur la fiche produit.

- **`blocks/bkr-order-note.liquid`** — l'encadré « Assemblée à la commande » qui
  annonce le délai. Fond vert à 14 %, filet vert à gauche : le vert reste un
  accent et ne porte pas de texte, conforme à la charte.
- **`blocks/bkr-product-specs.liquid`** — le tableau « Caractéristiques ». Il lit
  les metafields `bkr.*` et **ne rend une ligne que si le metafield est
  rempli** : mouvement, référence, type, réserve de marche, diamètre, épaisseur,
  boîtier, verre, bracelet, couleur et style de cadran, étanchéité. Rien n'est
  inventé, rien n'est écrit en dur. C'est exactement le mécanisme qui manquait —
  **les fiches produit se remplissent maintenant en renseignant les metafields
  côté Shopify**, sans toucher au thème.
  Il porte aussi une ligne de réassurance : « Paiement sécurisé · Retour sous
  14 jours selon conditions · Garantie légale de 2 ans ». Les deux durées sont
  celles du droit français (rétractation à distance, garantie légale de
  conformité) — elles tiennent, mais elles devront **concorder avec les pages
  légales** quand elles seront rédigées.

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
- **En-tête** — logo, menu `bkr-main`, sticky, transparent au-dessus du Hero.
  Sélecteurs pays et langue coupés (un seul marché, une seule langue).
- **Barre d'annonce** — trois messages qui tournent en boucle, 5 s chacun
  (4 septembre) : « LIVRAISON GRATUITE EN FRANCE », « LIVRAISON SOUS 8 À 9 JOURS
  OUVRÉS », « PAIEMENT SÉCURISÉ ».
  La rotation est **native et gratuite** : `sections/header-announcements.liquid`
  charge `announcement-bar.js` et passe en `autoplay` **dès qu'il y a plus d'un
  bloc `_announcement`**. Rien à coder, il suffit d'ajouter des blocs. Deux
  chevrons apparaissent alors de part et d'autre — c'est automatique aussi, et
  ils donnent la main au visiteur.
  C'est un **fondu enchaîné**, pas un défilement horizontal continu : les slides
  sont empilés en grille et l'un remplace l'autre en 0,5 s. Un vrai bandeau
  déroulant serait un autre travail — la section n'accepte que `_announcement`,
  jamais le bloc `_marquee` du thème.
  Le bloc `_announcement` est une exception utile : il appelle
  `typography-style` avec `preset: 'custom'` en dur, donc `font`, `font_size`,
  `weight`, `letter_spacing` et `case` **s'appliquent vraiment** ici, à la
  différence d'un bloc `text` ordinaire.
  Vérifié : rotation mesurée sur 18 s (les trois messages puis retour au
  premier), et une seule ligne à 375, 390 et 430 px pour les trois textes.
  **Le délai annoncé est 8 à 9 jours ouvrés**, tranché par le client le
  5 septembre. `blocks/bkr-order-note.liquid` a été aligné le même jour — il
  disait 9 à 10. Le thème ne mentionne le délai qu'à ces deux endroits, vérifié
  par recherche sur tout le miroir.

  **« GRATUITE EN FRANCE » et pas « GRATUITE » tout court.** Les tarifs de
  livraison ont été relevés avant d'écrire : France, Standard **offert dès 65 €**
  et 7,99 € en dessous, Express 10,99 € ; **UE 22 €** ; **International 29 €**.
  Comme toutes les montres sont à 190 €, la livraison est effectivement gratuite
  sur toute commande française — mais elle ne l'est jamais ailleurs, et les deux
  zones sont actives. « Livraison gratuite » sans mention de pays serait une
  promesse fausse pour un client belge ou suisse. Les deux mots de plus la
  rendent vraie. **Le jour où l'international passe à 0 €, le « EN FRANCE »
  saute.**
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
- **Accueil / Nos modèles disponibles** — `product-list`, carrousel sous 750 px.
  S'appelait « Les plus recherchées. » et pointait sur la collection manuelle
  `best-sellers` ; le thème corrigé l'a rebranchée sur **`seiko-mod`** et
  retitrée. Voir « Ce que le thème corrigé a changé ». La collection
  `best-sellers` existe toujours mais **n'est plus affichée nulle part**.
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
  autres auraient été des promesses non confirmées. **Les deux premiers ont été
  réécrits par le thème corrigé** — assemblage à la commande par l'atelier
  fournisseur, mouvements « éprouvés » plutôt que NH35 et VK63 annoncés pour
  tout le catalogue.
- **Accueil / Newsletter** — bloc natif `email-signup`, bouton intégré au champ,
  centrée. Aucune promesse de remise ni de fréquence.
- **Gabarit produit** — `templates/product.json`. Galerie en **carrousel** avec
  vignettes sous l'image (desktop) et points (mobile), format portrait fixe
  `1/1.25`. Le **zoom plein écran**, coupé en août à la demande du client, a
  été **rétabli** par le thème corrigé (`zoom: true`) : ne pas le recouper de sa
  propre initiative. Le bloc `disclosures` vide et son titre anglais ont été
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
- **Page `/collections`** — `templates/list-collections.json` ne rend que les
  collections choisies à la main. Le thème corrigé les a ramenées de huit à
  **trois** : `jour-date`, `chronographe-vk63`, `lunette-tournante` — celles qui
  ont des produits. Les cinq autres reviennent dans `collection_list` dès
  qu'elles auront des montres. Historique : Elle affichait les douze collections plus la
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

### Menu et panier — deux points sur trois

Fait le 16 août, dans `assets/bkr.css`. Les trois demandes venaient du client
(« plus compact »), et **aucune n'avait de réglage natif** : vérifié dans le
schéma du bloc `_header-menu` et dans `settings_schema.json`.

- **Tiroir de panier : 480 → 384 px**, et la vitrine est toujours poussée, pas
  recouverte. `--theme-drawer-width` valait `30rem` ; elle est posée sur
  `theme-drawer` **et** sur `.page-wrapper`, parce que la seconde s'en sert pour
  le décalage de la page. Une première tentative ne l'avait mise que sur
  `:root` : le tiroir gardait sa largeur, la page se décalait moins, et le titre
  du produit passait sous le panneau.
- **Tiroir de menu mobile : 28 → 20 px** sur les entrées de premier niveau,
  contre 14 px pour les sous-entrées. La taille n'a pas de réglage, et
  `menu_font_style` est un faux ami — son libellé de schéma est
  `t:settings.submenu_size`, il ne pilote que le sous-menu. Il a fallu une
  classe doublée : le thème redéclare la variable **sur l'entrée elle-même**, et
  l'héritage depuis `.menu-drawer` perd contre une déclaration directe.
- **Panneau de méga-menu du bureau : pas fait.** Deux tentatives sans effet
  mesurable, détaillées en commentaire dans `bkr.css`. Le panneau est posé par
  une grille et le fond noir visible est celui de l'en-tête, pas le sien — il
  est en `background-color: transparent`. Le rendre flottant demande de
  reprendre la grille et de lui donner son propre fond. **C'est le seul point
  de la demande qui reste ouvert.**

Le tiroir de **menu** garde sa largeur : mesuré, il ne lit pas
`--theme-drawer-width`, il vaut 95 % de la fenêtre avec un plafond à 500 px —
la proportion habituelle d'un menu mobile, et le client n'a rien dit dessus.

## Bloqué, en attente du client

| Quoi | Pourquoi ça bloque |
| --- | --- |
| **Caractéristiques des six fiches** | Le mécanisme est prêt : le bloc `bkr-product-specs` affiche une ligne par metafield `bkr.*` rempli, et rien quand il est vide. **Il ne manque plus que les données du fournisseur.** Rien ne sera écrit sans les caractéristiques du fournisseur — pas de mouvement, d'étanchéité ni de matériau inventés. Le cadran du Masterteiko affiche « 300m » : ce n'est pas une source, ça ne se recopie pas en étanchéité. |
| **Origine de l'image du Hero** | le fichier déposé s'appelle « ChatGPT Image 16 août 2026 » : c'est un **rendu génératif**, pas une photo. Il montre un écrin siglé BKR et des montres qui ne sont pas celles du catalogue. Le client l'a fourni pour cet usage ; le point lui a été signalé une fois. Les garde-fous interdisent « les rendus générés présentés comme des photos » — à re-trancher avec lui avant l'ouverture publique. |
| **Qualité des premières photos** | les quatre PNG livrés en premier font 311 à 400 px de large, pour ~2000 px attendus. Trois sont encore en ligne (Dayko noir, bleu roi, olive). Le second envoi est à ≈1120 × 1400 px, exploitable. Elles portent aussi un filigrane d'un tiers, et le cadran affiche « OYSTER PERPETUAL », « DAY-DATE » et « SUPERLATIVE CHRONOMETER OFFICIALLY CERTIFIED » sous le logo Seiko. Le client a demandé de les mettre en place malgré le filigrane ; il n'a pas répondu sur le texte du cadran. **Ne pas relancer de soi-même, mais ne pas non plus considérer le sujet comme tranché.** |
| **Photos** | Hero et cartes de collection affichent toujours les placeholders Shopify. Les contrastes mesurés le sont donc sur des images bouche-trou très claires — c'est le pire cas, ce qui va dans le bon sens. |
| **`best-sellers` n'est plus utilisée** | le trou noir de l'accueil est réglé autrement : la section pointe désormais sur `seiko-mod`. La collection reste vide et n'est plus branchée nulle part. **Rien à faire tant que le client ne veut pas d'une vraie sélection** — et le jour où il en voudra une, elle ne pourra pas s'appeler « les plus recherchées » avant la première vente. |
| **Page « Politique d'expédition »** | elle n'existe pas. Ne pas la rédiger — c'est un texte juridique. |
| **URL des réseaux sociaux** | champs volontairement vides. |
| **Semrush** | à ré-authentifier. |
| **Collection `frontpage` à dépublier** | Shopify crée d'office une collection « Page d'accueil », vide. Elle **ne s'affiche plus sur `/collections`** depuis le 16 août (la page ne liste que les huit handles choisis), mais elle reste **publiée** : son URL répond, et elle ressortira partout où l'on branchera une liste automatique. `publishableUnpublish` a été retenté deux fois : le connecteur le refuse par politique (« Unpublishing is blocked »), ce n'est pas un incident réseau. **Seul geste possible, côté client** : Collections → Page d'accueil → Publication → décocher « Boutique en ligne ». |

## Les pages Shopify contredisent le reste du site

Relevé le 5 septembre en vérifiant où le délai de livraison était annoncé. Les
pages `faq`, `livraison-et-retours` et `cgv` ont été écrites avant les
corrections d'août, et **personne ne les a reprises depuis**. Elles disent
aujourd'hui autre chose que le thème et que les réglages Shopify. Ce sont des
pages contractuelles : je ne les réécris pas, mais elles ne peuvent pas rester
en l'état avant l'ouverture.

**1. Le délai est cohérent, lui.** CGV article 5, FAQ et « Livraison et
retours » annoncent une livraison **sous 15 jours**. Le thème dit « 8 à 9 jours
ouvrés en général, dans la limite de 15 jours ». Les deux tiennent ensemble :
l'engagement contractuel reste 15 jours, le reste est une estimation. Rien à
changer.

**2. La zone de livraison, en revanche, ne tient pas.** La FAQ (« Nous livrons
actuellement en France métropolitaine uniquement ») et l'article 5 des CGV
(« La livraison est assurée en France métropolitaine ») disent France
seulement — alors que **deux zones étrangères sont actives dans Shopify** :
UE à 22 €, International à 29 €. Un client belge peut commander aujourd'hui,
payer 22 € de port, et se retrouver avec des CGV qui ne prévoient pas sa
livraison. **Soit on coupe les deux zones, soit on réécrit les deux pages.**

**3. « La livraison est gratuite » est écrit sans condition.** FAQ : « Combien
coûte la livraison ? Rien. » CGV article 3 : « Le prix affiché comprend la
livraison ». Or le tarif France n'est offert **qu'à partir de 65 €** (7,99 € en
dessous), et l'Express est à 10,99 €. Comme les montres sont à 190 €, c'est vrai
en pratique pour toute commande de montre — mais la phrase ne le dit pas, et
elle deviendrait fausse le jour où un accessoire à moins de 65 € entre au
catalogue.

**4. Le plus gênant : la FAQ et les CGV affirment les caractéristiques que le
reste du projet refuse d'écrire.** La FAQ annonce « **acier inoxydable 904L**,
avec **verre saphir** », « entre **39 et 40 mm** », « les boîtiers sont prévus
pour **100 mètres** ». Les CGV répètent les 100 mètres. Ce sont exactement les
valeurs que le skill `bkr-garde-fous` interdit d'avancer sans confirmation du
fournisseur — **jamais 904L par défaut** y figure mot pour mot. Résultat : le
site affirme sur ses pages d'aide ce que ses fiches produit se refusent à
afficher, faute de données. **À faire confirmer par le fournisseur, ou à
retirer des pages.**

**5. La FAQ décrit encore l'ancien modèle.** Elle parle d'une montre « ouverte
et reconstruite », « assemblée à la main », dont « le mouvement est conservé » —
c'est la formulation que la correction d'août a justement retirée de l'accueil
au profit de l'assemblage à la commande par un atelier fournisseur. Les deux
récits cohabitent aujourd'hui sur le même site.

Aucune de ces cinq lignes n'a été modifiée : ce sont des pages légales et
commerciales, elles relèvent du client.

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
quel thème on écrit : la bonne réponse est `186548322640`, `UNPUBLISHED`.
