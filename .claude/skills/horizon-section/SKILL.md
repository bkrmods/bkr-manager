---
name: horizon-section
description: Méthode de travail sur le thème Shopify Horizon de BKR Mods. À utiliser dès qu'il faut créer, modifier ou câbler une section, un bloc, un gabarit JSON (index.json, collection.json, product.json, header-group.json, footer-group.json) ou un réglage de thème — même pour un changement qui paraît trivial comme « change ce texte » ou « ajoute un bouton ». Impose de lire le schéma de la section avant d'écrire, interdit de deviner une valeur d'énumération, rappelle sur quel thème écrire, et liste les pièges Liquid et API déjà rencontrés sur ce projet.
---

# Travailler sur le thème Horizon de BKR

Horizon repose sur les *theme blocks* : une section déclare quels types de blocs
elle accepte, chaque bloc déclare ses réglages, et le contenu vit dans des
gabarits JSON. Tout se pilote donc par fichiers de configuration — presque
jamais par du CSS ou du Liquid sur mesure.

## Sur quel thème écrire

| | |
| --- | --- |
| Thème de développement | **BKR — dev (Horizon)** |
| ID | `gid://shopify/OnlineStoreTheme/186469122384` |
| Thème live | **Horizon**, `gid://shopify/OnlineStoreTheme/186380222800`, rôle `MAIN` |

Écrire uniquement sur le thème de dev. Ne jamais publier un thème. Avant une
série d'écritures, vérifier le rôle du thème visé — une inversion d'ID envoie
des modifications en production sans filet.

L'outil MCP Shopify bloque techniquement l'écriture sur un thème `MAIN`, mais ce
garde-fou ne remplace pas la vérification : il ne protège pas d'une écriture sur
le mauvais thème *non publié*.

## La procédure

L'erreur coûteuse sur ce thème n'est pas de mal coder : c'est d'inventer une
valeur. Un identifiant de réglage inexistant est ignoré silencieusement, une
valeur d'énumération invalide casse l'éditeur. Rien ne prévient. D'où l'ordre
suivant, qui n'est pas négociable même quand le changement paraît évident.

**1. Lire le schéma avant d'écrire.**

```graphql
query Schema($id: ID!) {
  theme(id: $id) {
    files(first: 1, filenames: ["sections/hero.liquid"]) {
      nodes { body { ... on OnlineStoreThemeFileBodyText { content } } }
    }
  }
}
```

Certains fichiers sont volumineux (`hero.liquid` fait ~55 Ko). Les lire quand
même : c'est la seule source qui fasse foi, et une section mal câblée coûte plus
cher qu'une lecture.

**2. En extraire trois choses** : les types de blocs acceptés (tableau `blocks`
du schéma ; `@theme` couvre tous les blocs publics), les identifiants de
réglages, et les valeurs autorisées de chaque `select`.

**3. Vérifier la chaîne parent → enfant.** Un bloc ne peut être posé que là où
son parent l'accepte. Un `menu` dans la section `footer` : vérifié. Un `button`
dans un `group` : vérifié parce que `group` accepte `@theme`.

**4. Construire le JSON en local**, le valider (`json.loads`), puis l'écrire via
`themeFilesUpsert`. Écrire le fichier entier — l'API ne fait pas de patch.

**5. Relire ce qui a été stocké** quand le changement est structurant, et
vérifier que le thème live n'a pas bougé (`updatedAt`).

**6. Miroir dans git.** Seuls les fichiers réellement modifiés vont dans
`horizon/`, avec le même chemin que dans le thème. Ne pas copier Horizon en
entier : maintenir un fork complet d'un thème qu'on ne modifie qu'à 5 % coûte
plus qu'il ne rapporte.

## Règle de base

Toute valeur qui n'a pas été vue dans un schéma ou dans un fichier existant du
thème ne s'utilise pas. Quand une valeur manque, deux options honnêtes : la
chercher dans le schéma, ou garder la valeur d'origine et le signaler. Jamais la
troisième — deviner et espérer.

Corollaire utile : les fichiers déjà présents (`templates/index.json` d'usine,
les `presets` d'une section) sont une mine de valeurs prouvées. Les lire coûte
moins cher que de lire un schéma de 55 Ko.

## Pièges déjà rencontrés

**Le champ `size` de l'API ne se lit pas les yeux fermés.** Sur un
`templates/index.json` il correspondait exactement au nombre d'octets envoyés ;
sur un autre fichier il valait environ 0,81 × la taille du fichier local. Il sert
donc à détecter un écart grossier, jamais à conclure qu'un fichier est identique
— pour ça, relire le contenu.

**La section générique s'appelle `_blocks`.** C'est la « section personnalisée »
d'Horizon : elle accepte `@theme`, `@app` et `_divider`, et porte les réglages de
mise en page habituels (direction, largeur, fond, marges). Le préfixe `_` ne la
rend pas privée — elle a un `preset`, donc l'éditeur l'ajoute comme n'importe
quelle autre. C'est l'hôte à utiliser dès qu'on veut composer une section à
partir de blocs sans écrire de fichier.

**Le tag HTML vient du réglage, pas du preset.** Dans un bloc `text`, le HTML
saisi dans `text` est rendu tel quel et `type_preset` ne fait que la taille.
`<h1>Titre</h1>` avec `type_preset: "h2"` produit un vrai H1 en taille H2. C'est
ce qui permet de tenir un seul H1 par page tout en gardant la hiérarchie
visuelle voulue.

**Les couleurs acceptent une référence ou un littéral.** `"{{ settings.color_palette.foreground }}"`
suit la palette, `"#1C5A4B"` la fige. Utiliser la référence par défaut, le
littéral seulement pour un accent volontairement indépendant.

**Attention aux valeurs héritées d'un thème clair.** Le gabarit d'usine
positionne souvent du texte en `color_palette.background` — sur une palette
sombre, ce texte devient invisible. Relire chaque couleur reprise d'un preset.

## Si du Liquid doit être écrit

Rare, mais deux pièges de Liquid Shopify méritent d'être connus, tous deux
rencontrés sur ce projet :

**Réassigner la variable de boucle ne fonctionne pas.** `assign x = x | strip`
à l'intérieur d'un `for x in liste` n'a aucun effet : la variable de boucle vit
dans une portée interne. Utiliser un nom distinct.

**Comparer `nil` à un nombre déclenche une erreur visible en boutique.**
`{% if section.settings.menu.links.size > 0 %}` sur un menu non renseigné
affiche « Liquid error » aux visiteurs. Passer par `| plus: 0` pour ramener
`nil` à `0`, ou tester `!= blank`.

**Attention aux différences entre moteurs Liquid.** Pour tester du Liquid hors
Shopify (python-liquid par exemple), garder en tête que `nil == blank` est vrai
chez Shopify et faux ailleurs, et que Ruby supprime l'entrée vide finale d'un
`split` alors que d'autres moteurs la conservent. Écrire du code qui se comporte
pareil dans les deux, et ajouter une garde plutôt que de dépendre du moteur.

## Ce qui vaut mieux que du code

Avant d'écrire une section sur mesure, chercher si Horizon fait déjà le travail.
Plusieurs besoins qui semblaient exiger du développement se sont révélés natifs :
l'en-tête transparent au-dessus du Hero, les colonnes de menu repliables en
accordéon sur mobile, la liste des politiques du pied de page, les
caractéristiques produit branchées sur des metafields, `fetchpriority="high"` sur
l'image du Hero, et les cartes de collection avec texte et CTA propres à chaque
carte — `collection-card` accepte `text`, `button`, `group` et `collection-title`
comme blocs enfants, ce que l'audit avait annoncé comme impossible.

Attention au piège inverse : `collection-list` accepte bien des blocs, mais ils
ne rendent que dans l'en-tête de section. Ses cartes viennent d'un unique gabarit
`_collection-card` statique répété sur le réglage `collection_list` — donc pas de
texte ni de CTA différents d'une carte à l'autre. Pour ça, il faut des blocs
`collection-card` publics posés à la main dans une section `_blocks`.

L'ordre de préférence est : natif Horizon → réglage à ajuster → gabarit JSON →
section sur mesure. Chaque fichier ajouté doit avoir une raison d'exister qu'on
puisse énoncer en une phrase.

## Mobile

Tester mentalement à 375, 390 et 430 px avant de valider : l'essentiel du trafic
attendu vient de TikTok, Instagram et Google mobile. Vérifier qu'aucune section
ne déborde horizontalement, que les zones cliquables restent atteignables au
pouce, et qu'une grille de plus de deux colonnes se replie.
