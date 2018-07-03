liste des commandes pour que ca marche :  

## dans les dossiers  

videz le dossier src/Migrations (les fichiers dont le nom commence par " _Version...._ "

## dans la console
```
yarn
```
```
yarn start
```
```
composer install 
```


## dans le fichier .env :

remplacez:  
```
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name
```

par (si les info de connexion son les mm pour vous): 
```
DATABASE_URL=mysql://root:Ereul9Aeng@127.0.0.1:3306/clicknsend
```

## dans la console
```
php bin/console doctrine:database:create
```
---
```
php bin/console make:migration
```
---
```
php bin/console doctrine:migrations:migrate

==> "yes" 
```
---
```
php bin/console doctrine:fixtures:load

==> "yes" 
```
---
