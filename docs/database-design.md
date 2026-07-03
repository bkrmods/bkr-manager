# BKR Manager — Database Design

Version: 0.1  
Objectif: définir la structure métier avant la création de la base de données avec Prisma.

---

## Vision générale

BKR Manager doit gérer une activité de vente de montres modifiées.

Le logiciel doit pouvoir gérer :

- les montres prêtes à vendre ;
- les composants ;
- les fournisseurs ;
- les commandes clients ;
- les clients ;
- les mouvements de stock ;
- l’assemblage des montres ;
- la finance ;
- les statistiques ;
- plus tard, un assistant IA.

---

## 1. Product

Un Product représente une montre terminée prête à être vendue.

Exemples :

- Datejust Arabic Blue
- GMT Pepsi
- Land Dweller
- Explorer II

Champs principaux :

- id
- name
- sku
- description
- category
- sellingPrice
- costPrice
- margin
- stock
- lowStockThreshold
- status
- imageUrl
- createdAt
- updatedAt

Statuts possibles :

- ACTIVE
- OUT_OF_STOCK
- ARCHIVED

---

## 2. Component

Un Component représente une pièce détachée utilisée pour assembler une montre.

Exemples :

- Mouvement NH35
- Boîtier Datejust 40mm
- Bracelet Jubilee
- Cadran Arabic Blue
- Aiguilles
- Lunette
- Verre saphir
- Couronne

Champs principaux :

- id
- name
- sku
- type
- supplierId
- unitCost
- stock
- lowStockThreshold
- status
- createdAt
- updatedAt

Types possibles :

- MOVEMENT
- CASE
- DIAL
- HANDS
- BRACELET
- BEZEL
- CRYSTAL
- CROWN
- OTHER

---

## 3. Supplier

Un Supplier représente un fournisseur.

Exemples :

- Fournisseur Alibaba
- Fournisseur WhatsApp
- Fournisseur local

Champs principaux :

- id
- name
- country
- alibabaUrl
- whatsapp
- email
- currency
- averageDeliveryDays
- qualityRating
- notes
- createdAt
- updatedAt

---

## 4. Build

Un Build représente l’assemblage d’une montre.

Quand une montre est assemblée :

- le stock des composants diminue ;
- le stock du produit fini augmente ;
- le coût de revient est calculé automatiquement.

Champs principaux :

- id
- productId
- quantity
- totalCost
- status
- createdAt

Statuts possibles :

- PLANNED
- COMPLETED
- CANCELLED

---

## 5. BuildComponent

BuildComponent relie un Build aux composants utilisés.

Exemple :

Pour construire 1 Datejust Arabic Blue :

- 1 mouvement NH35
- 1 boîtier Datejust
- 1 bracelet Jubilee
- 1 cadran Arabic Blue

Champs principaux :

- id
- buildId
- componentId
- quantityUsed
- unitCost

---

## 6. Customer

Un Customer représente un client.

Champs principaux :

- id
- firstName
- lastName
- email
- phone
- platform
- address
- totalSpent
- orderCount
- notes
- createdAt
- updatedAt

Plateformes possibles :

- VINTED
- INSTAGRAM
- TIKTOK
- WEBSITE
- MANUAL

---

## 7. Order

Une Order représente une commande client.

Champs principaux :

- id
- orderNumber
- customerId
- platform
- status
- totalAmount
- totalCost
- profit
- shippingCarrier
- trackingNumber
- createdAt
- updatedAt

Statuts possibles :

- PENDING
- PAID
- PREPARING
- SHIPPED
- DELIVERED
- CANCELLED
- REFUNDED

---

## 8. OrderItem

OrderItem relie une commande aux produits vendus.

Champs principaux :

- id
- orderId
- productId
- quantity
- unitPrice
- unitCost
- profit

---

## 9. InventoryMovement

Un InventoryMovement garde l’historique de tous les changements de stock.

Exemples :

- achat fournisseur ;
- assemblage ;
- vente ;
- retour client ;
- correction manuelle.

Champs principaux :

- id
- type
- productId
- componentId
- quantity
- reason
- createdAt

Types possibles :

- PURCHASE
- SALE
- BUILD
- RETURN
- ADJUSTMENT

---

## 10. Finance

La finance sera principalement calculée automatiquement à partir des commandes, achats et mouvements.

Indicateurs à calculer :

- chiffre d’affaires ;
- bénéfice brut ;
- marge moyenne ;
- coût du stock ;
- dépenses fournisseurs ;
- panier moyen ;
- nombre de ventes ;
- évolution mensuelle.

---

## Relations principales

Supplier → Components  
Product → Builds  
Build → BuildComponents  
BuildComponent → Components  
Customer → Orders  
Order → OrderItems  
OrderItem → Product  
Product → InventoryMovements  
Component → InventoryMovements  

---

## Objectif futur IA

L’assistant IA devra pouvoir répondre à des questions comme :

- Quels produits dois-je recommander ?
- Quel modèle est le plus rentable ?
- Quel fournisseur est le plus fiable ?
- Quels composants manquent pour assembler 10 montres ?
- Combien ai-je gagné ce mois-ci ?
- Quel stock dois-je préparer avant le prochain drop ?