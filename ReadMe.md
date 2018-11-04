# CLICK n' SEND

Clickn'Send est un projet de fin d'études de 4 étudiants de l'école O'clock (https://oclock.io/)

## Principe du programme : 
Clickn'Send est une application web francophone d'aide à la facturation. Projet Symfony / React, il permet d'une part de gérer des bases de données propre à son activité commerciale (clients/produits/factures-devis/paiements), et d'autre part de pouvoir , en 1 clic, générer une facture, l'éditer au format PDF et l'envoyer par mail au client et à soi-même.  
L'application permet également d'exercer une surveillance sur les factures, en signalant à l'utilisateur les factures impayées dont le délai de paiement est échu, et le cas-échéant envoyer un rappel en 1 clic, sur le même principe que l'envoi de facture.   
L'application permet enfin à l'administrateur de créer des profils pour d'autres utilisateurs, et de leur attribuer des rôles qui définissent ce qu'un utilisateur peut voir ou faire:

* **Read-Only Limited** : l’utilisateur peut consulter les données des Clients et des Produits (pas de création ni d’édition)
* **Read-Only Global** : l’utilisateur peut en plus consulter les données des Factures/Paiements (toujours ni création ni édition)
*  **Full-Access** : l’utilisateur peut voir/créer/éditer/”désactiver” les Clients/Factures/Produits
*  **Admin** : il peut éditer les informations relatives à l’entreprise, créer/modifier/supprimer les Membres ainsi que leurs rôles, voir/supprimer/éditer/”réactiver” les Clients/Factures/Produits/Paiements désactivés
## Technologies utilisées : Appli Symfony / React

* Bundles: wkHtmltoPdf, knpSnappy, swiftMailer

##  si vous souhaitez tester l'application, ci-dessous les Login/password utilisables avec les fixtures :

* administrateur : admin / admin
* utilisateur Full access : userFull / userFull
* utilisateur Read Only General : userRog / userRog
* utilisateur Read Only Limited : userRol / userRol
