<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180702154855 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, denomination VARCHAR(255) NOT NULL, reference VARCHAR(25) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, price NUMERIC(7, 2) NOT NULL, unity VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, lastname VARCHAR(50) NOT NULL, firstname VARCHAR(50) NOT NULL, company_adress VARCHAR(100) NOT NULL, country_code VARCHAR(10) NOT NULL, phone VARCHAR(30) DEFAULT NULL, mobile VARCHAR(30) DEFAULT NULL, fax VARCHAR(30) DEFAULT NULL, email VARCHAR(100) DEFAULT NULL, comment LONGTEXT DEFAULT NULL, pro TINYINT(1) NOT NULL, company_name VARCHAR(100) DEFAULT NULL, vat_number VARCHAR(50) DEFAULT NULL, remise NUMERIC(4, 2) DEFAULT NULL, INDEX IDX_81398E09979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE member (id INT AUTO_INCREMENT NOT NULL, company_id INT NOT NULL, role_id INT NOT NULL, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, INDEX IDX_70E4FA78979B1AD6 (company_id), INDEX IDX_70E4FA78D60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, rolename VARCHAR(30) NOT NULL, rolelabel VARCHAR(30) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment_method (id INT AUTO_INCREMENT NOT NULL, method VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE invoice (id INT AUTO_INCREMENT NOT NULL, customer_id INT NOT NULL, status_id INT NOT NULL, company_id INT NOT NULL, date DATE NOT NULL, reference VARCHAR(25) NOT NULL, amount_all_taxes NUMERIC(7, 2) NOT NULL, amount_dutty_free NUMERIC(7, 2) NOT NULL, taxes_amount NUMERIC(7, 2) NOT NULL, paid TINYINT(1) NOT NULL, down_payment NUMERIC(7, 2) DEFAULT NULL, reminder SMALLINT NOT NULL, deadline1 DATE NOT NULL, deadline2 DATE DEFAULT NULL, comment LONGTEXT DEFAULT NULL, INDEX IDX_906517449395C3F3 (customer_id), INDEX IDX_906517446BF700BD (status_id), INDEX IDX_90651744979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, company_name VARCHAR(255) NOT NULL, company_adress VARCHAR(255) NOT NULL, phone VARCHAR(30) DEFAULT NULL, fax VARCHAR(30) DEFAULT NULL, vat_number VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, bank_iban VARCHAR(30) NOT NULL, bank_bic VARCHAR(8) NOT NULL, bank_rib VARCHAR(23) DEFAULT NULL, bank_domiciliation VARCHAR(255) NOT NULL, payment_term VARCHAR(255) NOT NULL, logo VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE status (id INT AUTO_INCREMENT NOT NULL, invoice_status VARCHAR(25) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment (id INT AUTO_INCREMENT NOT NULL, payment_methode_id INT NOT NULL, customer_id INT NOT NULL, invoice_id INT NOT NULL, date DATE NOT NULL, amount NUMERIC(7, 2) NOT NULL, INDEX IDX_6D28840D743A4871 (payment_methode_id), INDEX IDX_6D28840D9395C3F3 (customer_id), INDEX IDX_6D28840D2989F1FD (invoice_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE invoice_has_product (id INT AUTO_INCREMENT NOT NULL, invoice_id INT NOT NULL, product_id INT NOT NULL, quantity NUMERIC(7, 2) NOT NULL, INDEX IDX_A3F50E452989F1FD (invoice_id), INDEX IDX_A3F50E454584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE member ADD CONSTRAINT FK_70E4FA78979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE member ADD CONSTRAINT FK_70E4FA78D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_906517449395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_906517446BF700BD FOREIGN KEY (status_id) REFERENCES status (id)');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_90651744979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D743A4871 FOREIGN KEY (payment_methode_id) REFERENCES payment_method (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D2989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('ALTER TABLE invoice_has_product ADD CONSTRAINT FK_A3F50E452989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('ALTER TABLE invoice_has_product ADD CONSTRAINT FK_A3F50E454584665A FOREIGN KEY (product_id) REFERENCES product (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE invoice_has_product DROP FOREIGN KEY FK_A3F50E454584665A');
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_906517449395C3F3');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D9395C3F3');
        $this->addSql('ALTER TABLE member DROP FOREIGN KEY FK_70E4FA78D60322AC');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D743A4871');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D2989F1FD');
        $this->addSql('ALTER TABLE invoice_has_product DROP FOREIGN KEY FK_A3F50E452989F1FD');
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09979B1AD6');
        $this->addSql('ALTER TABLE member DROP FOREIGN KEY FK_70E4FA78979B1AD6');
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_90651744979B1AD6');
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_906517446BF700BD');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE member');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE payment_method');
        $this->addSql('DROP TABLE invoice');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE status');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP TABLE invoice_has_product');
    }
}
