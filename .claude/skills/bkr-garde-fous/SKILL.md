---
name: bkr-garde-fous
description: Règles de véracité et actions interdites du projet BKR Mods (boutique Shopify de montres Seiko modifiées). À consulter avant d'écrire le moindre contenu destiné à la boutique — fiche produit, caractéristique technique, avis client, chiffre, page légale, mention d'une autre marque — et avant toute action sur Shopify Admin : publication de thème, paiements, domaine, commandes, clients, applications. BKR est une marque indépendante, non affiliée à Seiko : ne jamais inventer une spécification, un avis, une garantie ni une affiliation.
---

# Garde-fous BKR Mods

BKR Mods assemble et vend des montres Seiko modifiées. Deux risques dominent le
projet, et aucun n'est technique : affirmer une caractéristique fausse, et
laisser croire à un lien avec une marque tierce. Les deux se produisent par
distraction, en voulant bien faire — en remplissant un champ vide, en illustrant
une section, en cherchant une formule vendeuse.

## Ne jamais inventer

Ces informations ne s'écrivent que si elles viennent du fournisseur ou du
client. En leur absence, le champ reste vide et l'absence est signalée.

- **Caractéristiques techniques** : étanchéité, réserve de marche, matériau du
  boîtier, calibre, diamètre, type de verre. Les metafields `bkr.etancheite`,
  `bkr.reserve_de_marche` et `bkr.materiau_boitier` portent d'ailleurs la
  consigne dans leur description.
- **Acier 904L en particulier.** Ne jamais l'écrire par défaut : la plupart des
  boîtiers sont en 316L. Le 904L ne se renseigne que sur confirmation explicite.
- **Avis clients, notes, étoiles, nombre de clients, chiffres de vente.**
- **Garanties, certifications, provenance, partenariats.**
- **Textes légaux.** Ne pas rédiger de mentions légales, CGV, politique
  d'expédition ou de remboursement. Identifier ce qui manque et le signaler.

Le raisonnement : un champ vide se remplit en trente secondes quand la donnée
arrive. Une affirmation fausse sur une fiche produit engage la responsabilité du
vendeur, et une étanchéité inventée peut détruire la montre d'un client.

## Indépendance de marque

BKR est une marque indépendante. Le site ne doit jamais laisser penser qu'il
vend des produits officiels Seiko, Rolex ou d'une autre marque.

- Ne pas employer la nomenclature d'une autre marque pour nommer une gamme.
  L'ancienne organisation en familles « Datejust / Diver / Explorer / GMT » est
  abandonnée : c'est du vocabulaire Rolex.
- L'architecture en vigueur est `seiko-mod`, `arabic-dial`, `chronographe-vk63`.
- Décrire un produit comme « Seiko mod », « montre Seiko modifiée », jamais
  comme une Seiko officielle.
- Prévoir les emplacements d'une mention de transparence, sans la figer dans le
  code tant qu'elle n'a pas été validée : une formulation juridique n'est pas un
  choix de développeur.

## Avis clients

Aucun avis vérifiable n'existe aujourd'hui, et aucune application d'avis n'est
installée. La section d'avis reste donc masquée ou absente. Ne créer aucun avis
de démonstration, même marqué comme exemple : un faux avis oublié en ligne est
une pratique commerciale trompeuse.

Horizon fournit un bloc `review` natif — le garder en réserve pour le jour où de
vrais avis existent.

## Images

- Pas d'images récupérées sur le web.
- Pas de photos de concurrents, en particulier moddys-watches.com.
- Pas de faux visuels produit, pas de rendus générés présentés comme des photos.
- En attendant les vraies photos : les placeholders natifs de Shopify, qui se
  voient immédiatement comme provisoires.

## La référence concurrente

moddys-watches.com sert de repère pour la **logique e-commerce** : structure de
la page d'accueil, mise en avant des collections, réassurance, pédagogie autour
des mods. Jamais pour le reste. Ne pas reprendre leur code, leurs textes, leurs
images, leur logo, leurs couleurs, ni leur mise en page exacte.

## Actions Shopify interdites sans demande explicite

- publier un thème, ou modifier le thème publié
- Shopify Payments, paramètres financiers, moyens de paiement, paramètres fiscaux
- domaine
- commandes, clients, données personnelles
- installation ou suppression d'applications
- suppression de produits ou de collections

Pour tout le reste (collections, metafields, menus, fichiers du thème de dev),
agir puis rendre compte : quelles données Shopify Admin ont changé, ce qui n'a
touché que le thème de développement, et ce qui demande une intervention
manuelle.

## Contenu SEO

Les mots-clés prioritaires sont connus (seiko mod, seiko arabic dial, mouvement
nh35, seiko vk63, verre saphir montre, acier 904l). Les placer dans un texte qui
se lit naturellement — jamais de bourrage. Chaque page porte une intention
unique.

Ne pas toucher sans raison précise aux balises canoniques, au sitemap, au
robots.txt, aux données structurées natives ni au balisage produit de Shopify :
ces mécanismes fonctionnent, et les « améliorer » à l'aveugle se paie en
désindexation.

## En cas de doute

Une donnée manquante se signale, elle ne se comble pas. Écrire « cette valeur
n'est pas confirmée, je laisse le champ vide » est toujours le bon réflexe — et
c'est une information utile pour le client, pas un aveu d'échec.
