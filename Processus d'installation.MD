Installation de l'***environnement LAMP***















Tuto passage sous apache2 : 
- tout d abord executer cette commande dans le repo du projet : 

```
composer require symfony/apache-pack
```

Une question va etre posé pendant l instalation :   
```
reponder : yes
```
(si la question n est pas posée , exécuter :
```PHP
composer remove symfony/apache-pack 
// puis denouveau : 
composer require symfony/apache-pack
```

-  si la commande a bien fonctionné, un fichier ***.htaccess*** est apparus dans public.  
Remplacer son contenu par : 

```
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?params=$1 [L,QSA]
```

- ensuite créer un virtual host, pour ce faire : 
    - ouvrer le fichier /etc/hosts 
```
sudo nano /etc/hosts
```
et ajouter votre VH (ex : ***127.0.0.1 clicknsend.local*** / ***192.168.xx.xx nomdemonsite.C0M*** )

- ensuite aller dans le dossier /etc/apache2/sites-available et créer un fichier de conf (pour mon exemple ***clicknsend.local.conf***)
```PHP
// aller dans le dossier
cd /etc/apache2/sites-available
sudo touch clicknsend.local.conf
```
- dans ce fichier créé, copier ceci (en adaptant bien sûr les données a votre VH) : 
```PHP     
sudo nano 
```

```PHP     
<VirtualHost *:80>
  ServerAdmin juriens.rodrigue@gmail.com
  DocumentRoot "/var/www/html/projet/Click-n-send/public/" //attention mettre le bon chemin de son dossier
  ServerName clicknsend.local
  ServerAlias www.clicknsend.local
</VirtualHost>
```
- ensuite dans la console taper :
```PHP
sudo a2ensite clicknsend.local //metter votre ServerName si ce n est pas clicknsend.local
```
- redemarrer apache : 
```
service apache2 restart
```

si le site n est pas accesible apres ca , utiliser cette commande :  
```PHP
sudo a2enmod rewrite
// puis redémarrer apache  : 
service apache2 restart
```

- installer _WkHtmlToPdf _ 
### ***ATTENTION*** il faut choisir la version compatible avec l'OS qui fait tourner votre serveur   
https://wkhtmltopdf.org/downloads.html

puis vérifier que le fichier est bien installé sur le chemin ***/usr/local/bin/whhtmltopdf***

- installer _knp-snappy-bundle_
```
composer require knplabs/knp-snappy-bundle
```

- installer _swiftmailer-bundle_
```
composer require symfony/swiftmailer-bundle
```

dev-mo : méthode bourrine en cas de soucis  
chmod 777 -R /var/www/html/apothéose/Click-n-send/

