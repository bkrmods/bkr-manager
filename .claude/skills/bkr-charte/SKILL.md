---
name: bkr-charte
description: Charte graphique et direction artistique de BKR Mods, la boutique Shopify de montres Seiko mod (bkrmods.fr, thème Horizon). À consulter dès qu'une couleur, un bouton, un badge, un fond, un survol, une bordure, une typographie ou un rayon est choisi ou modifié — y compris quand la demande ne parle pas de design ("ajoute une section best-sellers", "mets un bouton ici", "cette page fait vide"). Contient les trois couleurs de marque, la règle qui interdit le vert en texte, la vérification de contraste obligatoire, et la liste des effets bannis. À utiliser aussi pour juger une proposition visuelle avant de l'écrire.
---

# Charte BKR Mods

BKR Mods vend des montres Seiko modifiées, montées à la main. Le site doit
donner l'impression d'une marque premium indépendante — jamais d'un site de
dropshipping, jamais d'une imitation de Rolex.

## Les trois couleurs

| Nom | Hex | Rôle |
| --- | --- | --- |
| Noir profond | `#0E0E0E` | fond dominant |
| Blanc cassé | `#F3F3F1` | texte, encre, logo |
| Vert Racing | `#1C5A4B` | **accent seulement** : boutons, survols, détails |

Quatre déclinaisons complètent la charte sans y ajouter de couleur :

| Nom | Hex | Rôle |
| --- | --- | --- |
| Noir adouci | `#121212` | fonds secondaires, dégradés |
| Noir relief | `#171717` | cartes, surfaces surélevées |
| Vert clair | `#2E8F76` | **seule** teinte d'accent utilisable en texte sur noir |
| Vert sombre | `#123A31` | halos, ombres colorées |

Le noir domine, le blanc cassé porte le texte, le vert ponctue. Si une maquette
donne l'impression d'un site « vert », c'est que le vert a débordé de son rôle.

## La règle du vert

Le Vert Racing sur le noir ne donne que **2,4:1** de contraste. C'est en dessous
du seuil de lisibilité, donc il ne porte jamais de texte directement.

- **En aplat** : parfait. Un bouton vert avec un libellé blanc cassé donne 7,2:1.
- **En texte sur noir** : jamais le vert de marque. Utiliser `#2E8F76` (4,9:1,
  conforme WCAG AA).
- **En surface** (bouton vert sur fond noir) : le contour du bouton ne détache
  que 2,4:1. C'est acceptable parce que le libellé blanc porte la lisibilité,
  mais ne pas empiler d'autres éléments verts autour.

## Où vivent les couleurs

Horizon centralise tout dans `settings.color_palette` (`config/settings_data.json`)
et les autres réglages y pointent par référence Liquid, par exemple
`{{ settings.color_palette.foreground }}`.

**Ne jamais créer un système CSS parallèle.** Si une couleur doit changer
partout, elle change dans la palette. Le vert n'est écrit en dur que là où il
doit rester un accent ponctuel : bouton principal, variante sélectionnée, badge
promotion.

| Rôle | Réglage Horizon |
| --- | --- |
| Fond | `color_palette.background` |
| Texte | `color_palette.foreground` |
| Texte secondaire | `color_palette.color1` |
| Bordures | `color_palette.color2` |

## Vérifier un contraste

Avant de valider une paire couleur texte / couleur fond, la calculer plutôt que
l'estimer à l'œil — sur un fond noir, l'intuition se trompe presque toujours
dans le sens optimiste.

```bash
python3 scripts/contraste.py "#F3F3F1" "#1C5A4B"
```

Seuils : **4,5:1** pour du texte courant, **3:1** pour du texte large (≥ 24 px ou
19 px gras) et pour les contours de composants. En dessous, changer la couleur —
pas le seuil.

## Typographie

Inter, la police native d'Horizon, hébergée par Shopify. Aucune police externe :
un `@font-face` distant coûte une requête bloquante et un risque de FOUT, pour un
gain esthétique nul sur une grotesque moderne.

Direction : sans serif, titres forts, textes courts, beaucoup d'espace. Éviter
l'esthétique magazine avec sérifs marquées — ce n'est pas le registre de la
marque.

## Formes

Rayons sobres et cohérents : **4 px** sur les boutons, cartes, champs et
popovers. Les rayons très arrondis (14 px et plus, le défaut d'Horizon) donnent
un air d'application grand public, pas d'horlogerie.

## Interdits

Ces éléments sont exclus par la direction artistique, même s'ils sont proposés
par un thème ou une section native :

- doré, cuivre, chrome artificiel, dégradés métal brossé
- dégradés flashy, couleurs criardes
- grosses ombres portées diffuses
- arrière-plans animés en continu, halos qui dérivent, `backdrop-filter` permanent
- carrousels automatiques, compte à rebours, bandeaux promotionnels agressifs
- tout effet qui coûte du GPU en permanence sur mobile

La raison est double : ces effets datent le site et sont la signature visuelle du
dropshipping, et ils dégradent les Core Web Vitals sur le trafic mobile — qui est
l'essentiel du trafic attendu (TikTok, Instagram, Google mobile).

## Le cas des couleurs produit

Les couleurs de cadran (bleu, vert, bordeaux, laiton…) ne font **pas** partie de
la charte. Elles décrivent un produit, pas la marque. Elles ne doivent jamais
être introduites comme couleurs d'interface.

## Test rapide avant de valider

1. Le vert occupe-t-il moins de 10 % de la surface visible ?
2. Chaque texte passe-t-il 4,5:1 ?
3. La page tiendrait-elle en noir et blanc sans perdre sa hiérarchie ?
4. Y a-t-il un effet qui bouge sans que l'utilisateur l'ait déclenché ?

Trois oui et un non, et c'est bon.
