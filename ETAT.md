# BKR Mods — état du projet

Note de reprise. Ce fichier est chargé automatiquement par `CLAUDE.md` : une
nouvelle session sait donc où on en est sans qu'on ait à le lui raconter.

**À tenir à jour à chaque fin de séance.** Dernière mise à jour : 14 août 2026,
après la section Collections de la page d'accueil.

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
| Branche git | `claude/bkrmods-color-legal-pages-jwtyai` |
| Miroir des fichiers modifiés | `horizon/` (voir `horizon/README.md`) |

Le thème live n'a pas bougé depuis le **2026-08-09T19:00:02Z**. Vérifier son
`updatedAt` après chaque série d'écritures.

### Collections

| Handle | Titre |
| --- | --- |
| `seiko-mod` | Toutes les Seiko Mods |
| `arabic-dial` | Arabic Dial |
| `chronographe-vk63` | Chronographes VK63 |
| `automatique-nh35` | Automatiques NH35 |
| `best-sellers` | Best-sellers (manuelle, ordre réglé à la souris) |

Toutes vides : **il n'y a encore aucun produit dans la boutique.**

### Menus

`bkr-main` (en-tête) · `bkr-footer-bkr` · `bkr-footer-boutique` ·
`bkr-footer-assistance` · `bkr-footer-informations`

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
  bloc natif des politiques Shopify, réseaux sociaux **vidés** (pas de lien
  inventé).
- **Accueil / Hero** — plein écran, un seul `<h1>`, deux CTA, overlay dégradé.
- **Accueil / Best-sellers** — `product-list` sur la collection manuelle
  `best-sellers`, carrousel sous 750 px.
- **Accueil / Collections** — « Choisissez votre style. », trois cartes
  éditoriales natives (`collection-card` accepte `text`, `button`, `group`,
  `collection-title` comme enfants) dans une section `_blocks`.
- **Metafields** `bkr.*` créés, avec la consigne « ne pas inventer » dans leur
  description.
- **Trois skills** dans `.claude/skills/` : `bkr-charte`, `horizon-section`,
  `bkr-garde-fous`.

## Reste à faire

**Page d'accueil**, dans l'ordre du cahier des charges §15 :

1. La Sélection BKR
2. Qu'est-ce qu'une Mod ?
3. Every detail matters (vidéo)
4. Caractéristiques
5. Guides SEO
6. Avis clients — **section à laisser masquée** tant qu'il n'y a pas de vrais avis
7. Réseaux sociaux
8. Newsletter

**Ensuite** : gabarits de collection, gabarit produit réutilisable, QA.

## Bloqué, en attente du client

| Quoi | Pourquoi ça bloque |
| --- | --- |
| **Mot de passe de la boutique** | la vitrine est protégée : aucune vérification visuelle possible à 375 / 390 / 430 px. Toute la QA est structurelle pour l'instant. |
| **Photos** | Hero, cartes de collection et fiches produit affichent les placeholders Shopify. Le Drive est vide. C'est le principal frein du projet. |
| **Produits** | la boutique est vide : les sections branchées sur une collection ne rendent rien, ce qui est le comportement attendu. |
| **Page « Politique d'expédition »** | elle n'existe pas. Ne pas la rédiger — c'est un texte juridique. |
| **URL des réseaux sociaux** | champs volontairement vides. |
| **Semrush** | à ré-authentifier. |

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
