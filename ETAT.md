# BKR Mods — état du projet

Note de reprise. Ce fichier est chargé automatiquement par `CLAUDE.md` : une
nouvelle session sait donc où on en est sans qu'on ait à le lui raconter.

**À tenir à jour à chaque fin de séance.** Dernière mise à jour : 15 août 2026,
après la première QA visuelle réelle (le réseau vers la vitrine a été ouvert).

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
| `arabic-dial` | Arabic Dial | cadran — **famille** |
| `chronographe-vk63` | Chronographes VK63 | mouvement / silhouette |
| `automatique-nh35` | Automatiques NH35 | mouvement |
| `best-sellers` | Best-sellers | sélection manuelle |
| `classique-date` | Seikojust | silhouette (Datejust) |
| `jour-date` | Dayko | silhouette (Day-Date) |
| `double-fuseau` | Gmteiko | silhouette (GMT-Master II) |
| `bracelet-integre` | Seikolus | silhouette (Nautilus) |
| `octogonale` | Seikoak | silhouette (Royal Oak) |
| `lunette-tournante` | Masterteiko | silhouette (Yacht-Master) |
| `boitier-carre` | Santeiko | silhouette (Santos) |

`chronographe-vk63` porte le nom **Seikona** (Daytona) et sert donc à la fois
d'axe mouvement et de famille de silhouette.

Toutes vides : **il n'y a encore aucun produit dans la boutique.**

Les douze sont maintenant **publiées** sur « Boutique en ligne » et « Shop ».
Quatre ne l'étaient pas — `seiko-mod`, `arabic-dial`, `chronographe-vk63`,
`best-sellers` — et c'est ce qui faisait afficher « Titre de la collection » sur
deux cartes de l'accueil, disparaître les quatre de `/collections`, et pointer
dans le vide le menu « Montres » et le second CTA du Hero. Réparé le 15 août.

**Les noms de famille ont été choisis par le client.** Ils combinent la marque
Seiko et des noms de modèles protégés (Rolex, Patek Philippe, Audemars Piguet).
Le risque juridique lui a été exposé en détail, avec une série de noms de
remplacement ; il a maintenu son choix. **Ne pas revenir dessus de sa propre
initiative** — le raisonnement complet est dans `horizon/README.md`.

Les handles restent descriptifs : le nom s'affiche, l'URL décrit la montre.

### Menus

`bkr-main` (en-tête) · `bkr-footer-bkr` · `bkr-footer-boutique` ·
`bkr-footer-assistance` · `bkr-footer-informations`

En-tête, menu à deux niveaux : **Montres** (toutes les montres, best-sellers) ·
**Familles** (les huit) · Guides · À propos. Horizon en fait un méga-menu tout
seul, et un accordéon dans le tiroir mobile.

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
- **Accueil / Best-sellers** — `product-list` sur la collection manuelle
  `best-sellers`, carrousel sous 750 px.
- **Accueil / Collections** — « Choisissez votre style. », trois cartes
  éditoriales natives (`collection-card` accepte `text`, `button`, `group`,
  `collection-title` comme enfants) dans une section `_blocks`.
- **Accueil / Qu'est-ce qu'une Seiko Mod ?** — section native
  `media-with-content`, preset éditorial : image débordante à gauche, texte
  pédagogique et CTA à droite. Aucune caractéristique technique avancée.
- **Accueil / Caractéristiques** — « Sur chaque montre. », trois points
  (assemblage, mouvements, paiement). Volontairement trois et pas six : les
  autres auraient été des promesses non confirmées.
- **Accueil / Newsletter** — bloc natif `email-signup`, bouton intégré au champ,
  centrée. Aucune promesse de remise ni de fréquence.
- **Gabarit de collection** — `templates/collection.json`, un seul gabarit pour
  les douze : en-tête `_blocks` branché sur `closest.collection` (titre en
  `<h1>` + description), puis `main-collection` avec filtres et tri natifs.
  Vérifié en capture aux quatre largeurs sur `/collections/arabic-dial`.
- **Aperçu visuel** — `horizon/apercu.mjs` tourne enfin : le réseau vers la
  vitrine est ouvert. Captures aux quatre largeurs dans `captures/`.
- **Contraste des cartes de collection** — le voile est passé de `#0E0E0EA6` à
  `#0E0E0ECC`. Mesuré sur la capture : 4,21:1 avant, 6,6:1 après. En dessous de
  4,5:1 l'accroche et le lien « Voir la collection » n'étaient pas conformes.
  Le Hero garde `A6`, il est déjà entre 5,6 et 7,1:1.
- **Metafields** `bkr.*` créés, avec la consigne « ne pas inventer » dans leur
  description.
- **Trois skills** dans `.claude/skills/` : `bkr-charte`, `horizon-section`,
  `bkr-garde-fous`.

## Reste à faire

**Page d'accueil**, dans l'ordre du cahier des charges §15 :

1. La Sélection BKR — **spec à récupérer**, voir ci-dessous
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

### La Sélection BKR — à clarifier avant de construire

Le texte du cahier des charges §15 n'est plus dans le dépôt et le nom seul est
ambigu. Deux lectures possibles, qui ne donnent pas la même section :

- une **sélection maison** de produits — mais la section Best-sellers en est
  déjà une, on ferait deux grilles quasi identiques ;
- une **mise en avant d'une seule montre**, avec son histoire et un CTA — plus
  cohérent visuellement, et ça évite la redite.

Demander au client de recoller le paragraphe §15 avant d'écrire. En attendant,
la deuxième lecture est la plus défendable.

**Ensuite** : gabarit produit réutilisable, puis QA.

Le gabarit de collection est fait. Deux choses l'attendent, côté contenu :

- **Les descriptions de collection sont vides** (les douze). Le bloc description
  du gabarit est en place et ne rend rien tant qu'elles le restent. Les
  métadonnées SEO, elles, sont déjà écrites. Reprendre celles-ci en description
  visible est une piste — c'est du texte déjà validé, pas de l'invention — mais
  ça reste une décision du client.
- **« Aucun produit trouvé. Essayez d'utiliser moins de filtres »** s'affiche sur
  les douze collections vides, alors qu'aucun filtre n'est actif. Chaîne native
  d'Horizon, correcte quand un filtre ne renvoie rien. Elle disparaît au premier
  produit — ne pas la surcharger.

## Bloqué, en attente du client

| Quoi | Pourquoi ça bloque |
| --- | --- |
| **Photos** | Hero, cartes de collection et fiches produit affichent les placeholders Shopify. Le Drive est vide. C'est le principal frein du projet. Les contrastes mesurés le sont donc sur des images bouche-trou très claires — c'est le pire cas, ce qui va dans le bon sens. |
| **Produits** | la boutique est vide. Maintenant que `best-sellers` est publiée, la section « Les plus recherchées. » affiche les **produits bouche-trou de Shopify** (« Titre de produit », 19,99 €) au lieu de ne rien rendre. C'est le comportement d'Horizon sur une collection vide, pas un faux contenu qu'on aurait écrit — ça disparaîtra au premier produit. |
| **Page « Politique d'expédition »** | elle n'existe pas. Ne pas la rédiger — c'est un texte juridique. |
| **URL des réseaux sociaux** | champs volontairement vides. |
| **Semrush** | à ré-authentifier. |
| **Collection `frontpage` à dépublier** | Shopify crée d'office une collection « Page d'accueil », vide, qui s'affiche donc comme une carte sur `/collections` — vérifié sur capture le 15 août. `publishableUnpublish` a été retenté deux fois : le connecteur le refuse par politique (« Unpublishing is blocked »), ce n'est pas un incident réseau. **Seul geste possible, côté client** : Collections → Page d'accueil → Publication → décocher « Boutique en ligne ». |

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
