# INSTALLATION DE L'***ENVIRONNEMENT LAMP***
---
## CREATION D’UN UTILISATEUR AVEC PRIVILEGES ROOT

si vous avez déjà un utilisateur root, vous pouvez passer cette étape et commencer directement l'installation d'Apache2

passez en superutilisateur
```
sudo su
```
créez un nouvel utilisateur
```
adduser NomDuNouveauUser
```
donnez les droits root
```
gpasswd –a NomDuNouveauUser sudo
```
changez d'utilisateur
```
su NomDuNouveauUser
```
---
## INSTALLATION D’APACHE

```
apt-get update && apt-get install apache2
```
verifiez : ouvrez un navigateur, et entrez "localhost" dans l'URL, le navigateur doit afficher ceci :  

![alt tag](images/apache.png)

---
## INSTALLATION DE PHP 7.2
```
apt-get install python-software-properties
```
```
add-apt-repository ppa:ondrej/php
```
```
apt-get update && apt-get install php7.2
```
```
apt-get install php-pear php7.2-curl php7.2-dev php7.2-gd php7.2-mbstring php7.2-zip php7.2-mysql php7.2-xml
```

#### pour vérifier que c'est bien la version 7.2 de PHP qui a bien été installée, nous allons créer un fichier info :

allez dans le dossier du localhost
```
cd /var/www/html
```
puis créez le fichier ***phpinfo***
```
touch phpinfo.php
echo "<?php phpinfo();" > phpinfo.php
```

allez sur votre navigateur à l'URL "***localhost***" et cliquez sur `phpinfo.php`.  
vous devriez avoir cette écran qui affiche la version de PHP
![alt tag](images/phpinfo.png)

---
## INSTALLATION DE MySQL
```
apt-get install mysql-server php7.2-mysql
```
choisir un mot de passe pour MySQL (choisissez un mot de passe à sécurité élevée, il sera important pour la suite car il gèrera l'accès aux données depuis l'appli)

---
## INSTALLATION DE PHPMYADMIN
```
apt-get install phpmyadmin
```
- "Veuillez choisir le serveur web à reconfigurer  automatiquement pour exécuter phpMyAdmin  
Serveur web à reconfigurer automatiquement : " 
    - choisir : ***apache2***
    
- Faut-il configurer la base de données de phpmyadmin avec dbconfig-common ? 
    - Oui

- indiquer un mot de passe   

Rendez-vous à l'URL ***localhost/phpmyadmin***, et entrez le username "***root***" et votre mot de passe  
![alt tag](images/phpmyadmin.png)  

---
# l'environnement LAMP est installé, passons aux technologies utilisées par l'application  
## Clickn'Send se base sur les framework Symfony(php) et React(JavaScript)


---
## INSTALLATION DE NODE JS
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
```
---
## INSTALLATION DE YARN (installe la 1.7.0)
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
```
apt-get update && apt-get install yarn
```

---
## INSTALLATION DE COMPOSER
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

php composer-setup.php

php -r "unlink('composer-setup.php');"
```
puis installation globale
```
mv composer.phar /usr/local/bin/composer
```
enfin
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
---
# préparation du  dossier CLICK-N-SEND
se rendre à la racine du dossier Click-n-send
```
cd /var/www/html/CheminDuDossier/Click-n-send
```
```
yarn
```
```
yarn start
```
```
composer install
```

# personnalisation de l'appli
## la base de données

pour les utilisateurs avancés, il est recommandé de créer une base, un utilisateur et un mot de passe via PhPMyAdmin, afin d'éviter d'utiliser les données "root" (pour une question de sécurité)


Rendez-vous dans le fichier ***.env***
```
sudo nano .env
```
![alt tag](images/env.png)

avec les paramètres de votre base de données, remplacez la ligne:
```
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name
```  
- ***db_user***: nom d'utilisateur de votre base de données (par défaut "***root***", mais il est conseillé d'en créer un dans PhpMyAdmin) 
- ***db_password***: mot de passe (par défaut, celui que vous avez défini en installant MySQL, mais il est conseillé d'en créer un nouveau en créant un nouvel utilisateur)  
- ***127.0.0.1:3306***: adresse IP de votre serveur
- ***db_name***: ce sera le nom de votre base de données, vous êtes libre de choisir n'importe lequel, mais il est tout de même conseillé d'avoir un nom en rapport avec l'appli à laquelle il est associé  

![alt tag](images/envDatabase.png)

pour sauvegarder les modifications, faites   
- `Ctrl + o`  
- `Entrée`   
- `Ctrl + x`  

---
### déploiement de la base de données

(si vous n'avez pas créé une base avec PhpMyAdmin, tapez `php bin/console doctrine:database:create`, cela créera une table au nom que vous aurez choisi pour remplacer **db_name** dans le fichier .env)


```
php bin/console make:migration
```
```
php bin/console doctrine:migrations:migrate
```  
- répondre YES

### Votre base de données est maintenant prête pour faire fonctionner l'appli

---
## le Mailer
Clickn'Send vous permet d'envoyer automatiquement vos factures par mail  
il vous faut donc une adresse mail Gmail depuis laquelle seront expédiés les factures
Si votre compte Gmail utilise la validation en deux étapes, vous devez générer un nouveau *"mot de passe d'application"* et l'utiliser comme mot de passe de l'expéditeur.  
Vous devez également veiller à autoriser les applications moins sécurisées à accéder à votre compte Gmail.

avec les paramètres de votre boîte mail, remplacez la ligne:
```
MAILER_URL=null://localhost
``` 
par
``` 
MAILER_URL=gmail://mail_adress@gmail.com:mail_password@localhost
```
par exemple `MAILER_URL=gmail://clicknsend@gmail.com:monsupermotdepasse@localhost`

![alt tag](images/envMailer.png)

pour sauvegarder les modifications, faites   
- `Ctrl + o`  
- `Entrée`   
- `Ctrl + x`  

---


---

# Tuto passage sous apache2 : 
tout d abord executez cette commande dans le dossier du projet : 

```
composer require symfony/apache-pack
```

Une question va etre posée pendant l instalation :   
```
repondre : yes
```
*si la question n est pas posée , exécutez :*
```PHP
composer remove symfony/apache-pack 
// puis de nouveau : 
composer require symfony/apache-pack
```

-  si la commande a bien fonctionné, un fichier ***.htaccess*** est apparus dans public.  
Remplacez son contenu par : 
```
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?params=$1 [L,QSA]
```

- ensuite créer un virtual host, pour ce faire : 
    - ouvrir le fichier /etc/hosts
```
sudo nano /etc/hosts.custom
```
et ajoutez votre VH (ex : ***127.0.0.1 clicknsend.local***  ou ***192.168.xx.xx nomdemonsite.C0M*** )

- ensuite allez dans le dossier **/etc/apache2/sites-available** et créer un fichier de conf (pour mon exemple ***clicknsend.local.conf***)
```PHP
// allez dans le dossier
cd /etc/apache2/sites-available
sudo touch clicknsend.local.conf
```
- dans ce fichier créé, copiez ceci (en adaptant bien sûr les données a votre VH) : 
```PHP     
sudo nano 
```

```PHP     
<VirtualHost *:80>
  ServerAdmin MonAdresseMail@MonMail.com
  DocumentRoot "/var/www/html/CheminDeMonDossier/Click-n-send/public/" //attention mettre le bon chemin de son dossier
  ServerName clicknsend.local
  ServerAlias www.clicknsend.local
</VirtualHost>
```
- ensuite dans la console tapez :
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
---
- installer _WkHtmlToPdf_   
le paquet se télécharge ICI => https://wkhtmltopdf.org/downloads.html  
#### ***ATTENTION*** il faut choisir la version compatible avec l'OS qui fait tourner votre serveur
puis vérifier que le fichier est bien installé sur le chemin ***/usr/local/bin/whhtmltopdf***  


- installer _knp-snappy-bundle_
```
composer require knplabs/knp-snappy-bundle
```

- installer _swiftmailer-bundle_
```
composer require symfony/swiftmailer-bundle
```

dev-mode : méthode bourrine en cas de soucis  
chmod 777 -R /var/www/html/apothéose/Click-n-send/