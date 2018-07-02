liste des commandes pour que ca marche :  

## dans les dossiers  

videz le dossier src/Migrations

## dans la console
```
composer install yarn
```

## dans le fichier .env :

remplacez:  
```
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name
```

par (si les info de connexion son les mm pour vous): 
```
DATABASE_URL=mysql://root:Ereul9Aeng@127.0.0.1:3306/testsymforeact
```

## dans la console
```
php bin/console doctrine:database:create
```
```
php bin/console doctrine:migration:migrate
```
```
php bin/console doctrine:fixtures:load
```