<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use \Datetime;

use App\Entity\Invoice;
use App\Entity\InvoiceHasProduct;
use App\Entity\Member;
use App\Entity\Payment;
use App\Entity\PaymentMethod;
use App\Entity\Product;
use App\Entity\Role;
use App\Entity\Status;
use App\Entity\Company;
use App\Entity\Customer;


class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {   

        $roleAdmin = new Role();
        $roleAdmin->setRolename('ROLE_ADMIN');
        $roleAdmin->setRoleLabel('Administrateur');
        $manager->persist($roleAdmin);
  
        $roleFull = new Role();
        $roleFull->setRolename('ROLE_FULL');
        $roleFull->setRoleLabel('Full');
        $manager->persist($roleFull);

        $roleRog = new Role();
        $roleRog->setRolename('ROLE_ROG');
        $roleRog->setRoleLabel('Read-Only-Global');
        $manager->persist($roleRog);

        $roleRol = new Role();
        $roleRol->setRolename('ROLE_ROL');
        $roleRol->setRoleLabel('Read-Only-Limited');
        $manager->persist($roleRol);


        $devis = new Status();
        $devis->setInvoiceStatus('devis');
        $manager->persist($devis);

        $devisRefuse = new Status();
        $devisRefuse->setInvoiceStatus('devis refusé');
        $manager->persist($devisRefuse);

        $brouillon = new Status();
        $brouillon->setInvoiceStatus('brouillon');
        $manager->persist($brouillon);
        
        $facture = new Status();
        $facture->setInvoiceStatus('facture');
        $manager->persist($facture);

        $factureRecurrente = new Status();
        $factureRecurrente->setInvoiceStatus('facture récurrente');
        $manager->persist($factureRecurrente);


        $cb = new PaymentMethod();
        $cb->setMethod('carte bleue');
        $manager->persist($cb);

        $especes = new PaymentMethod();
        $especes->setMethod('espèces');
        $manager->persist($especes);

        $cheque = new PaymentMethod();
        $cheque->setMethod('chèque');
        $manager->persist($cheque);

        $lettreChange = new PaymentMethod();
        $lettreChange->setMethod('lettre de change');
        $manager->persist($lettreChange);
        
        
        $companies = [];        
        
        for ($i=0; $i < 2; $i++) { 
         $company = new Company();
            $company->setCompanyName('company name'. $i);
            $company->setCompanyAdress('company adress'. $i);
            $company->setPhone('+334502835'. $i);
            $company->setFax('+33520154'. $i);
            $company->setVatNumber('61565126'. $i);
            $company->setEmail('company'. $i .'@gmail.com');
            $company->setBankIban('53135435'. $i);
            $company->setBankBic('65654' . $i . '13');
            $company->setBankRib($i.'2'.$i.'3'.$i.'5'.$i);
            $company->setBankDomiciliation('company bank'. $i);
            $company->setPaymentTerm('4'); //echeance en semaine (W en date php)
            $companies[] = $company;            
            $manager->persist($company);
        }

        $customers1 = [];

        for ($i=0; $i < 4; $i++) { 
            $customer = new Customer();
            $customer->setLastname('customer lastname'.$i);
            $customer->setFirstname('customer firstname'.$i);
            $customer->setCompanyAdress('customer adress'.$i);
            $customer->setCountryCode('country'.$i);
            $customer->setPhone('01'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setMobile('06'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setFax('08'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment('le client'.$i.' est sympa');
            $customer->setPro(false);
            //$customer->setCompanyName();
            //$customer->setVatNumber();
            //$customer->setRemise();
            $customer->setCompany($companies[0]);
            $customers1[] = $customer;
            $manager->persist($customer); 
        }
        

        $customer2 = [];

        for ($i=0; $i < 4; $i++) { 
            $customer = new Customer();
            $customer->setLastname('customer lastname'.$i);
            $customer->setFirstname('customer firstname'.$i);
            $customer->setCompanyAdress('customer adress'.$i);
            $customer->setCountryCode('country'.$i);
            $customer->setPhone('01'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setMobile('06'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setFax('08'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment('le client'.$i.' est sympa');
            $customer->setPro(false);
            //$customer->setCompanyName();
            //$customer->setVatNumber();
            //$customer->setRemise();
            $customer->setCompany($companies[1]);
            $customers2[] = $customer;
            $manager->persist($customer); 
        }

        $products = [];        
        
        for ($i=0; $i < 40; $i++) { 
            $product = new Product();
            $product->setDenomination('denomination'. $i);
            $product->setReference('ref'. $i);
            $product->setDescription('descritpion' .$i);
            $product->setPrice(150 + $i);
            $product->setUnity('unité');
            $products[] = $product; 
            $manager->persist($product);
        }

        $invoices1 = [];
        
        for ($i=0; $i < 4; $i++) { 
            $invoice = new Invoice();
            $invoice->setDate(new DateTime('now'));
            $invoice->setReference('78'.$i.'12'.$i.'5'.$i.'4'.$i.'3');
            $invoice->setAmountAllTaxes(2400 + $i);
            $invoice->setAmountDuttyFree(1600 + $i);
            $invoice->setTaxesAmount(400 + $i);
            $invoice->setPaid(false);
            $invoice->setDownPayment(450 + $i);
            $invoice->setReminder(0);
            $invoice->setDeadline1(new DateTime('now'));
            //$invoice->setDeadline2();
            $invoice->setComment('je sens qu\'il la paiera jamais : faire gaffe !');
            $invoice->setCustomer($customers1[$i]);
            $invoice->setStatus($facture);
            $invoice->setCompany($companies[0]);
            $invoices1[] = $invoice;        
            $manager->persist($invoice);

        }

        $invoices2 = [];
        
        for ($i=0; $i < 4; $i++) { 
            $invoice = new Invoice();
            $invoice->setDate(new DateTime('now'));
            $invoice->setReference('78'.$i.'12'.$i.'5'.$i.'4'.$i.'3');
            $invoice->setAmountAllTaxes(200 + $i);
            $invoice->setAmountDuttyFree(160 + $i);
            $invoice->setTaxesAmount(40 + $i);
            $invoice->setPaid(false);
            $invoice->setDownPayment(45 + $i);
            $invoice->setReminder(0);
            $invoice->setDeadline1(new DateTime('now'));
            //$invoice->setDeadline2();
            $invoice->setComment('je sens qu\'il la paiera jamais : faire gaffe !');
            $invoice->setCustomer($customers2[$i]);
            $invoice->setStatus($facture);
            $invoice->setCompany($companies[1]);
            $invoices2[] = $invoice;        
            $manager->persist($invoice);

        }
            
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices1[0]);
            $invoiceHasProduct->setProduct($products[$i]);
            $manager->persist($invoiceHasProduct);
        }
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices1[1]);
            $invoiceHasProduct->setProduct($products[$i+4]);
            $manager->persist($invoiceHasProduct);
        }
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices1[2]);
            $invoiceHasProduct->setProduct($products[$i + 8]);
            $manager->persist($invoiceHasProduct);
        }
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices1[3]);
            $invoiceHasProduct->setProduct($products[$i + 12]);
            $manager->persist($invoiceHasProduct);
        }

        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices2[0]);
            $invoiceHasProduct->setProduct($products[$i + 16]);
            $manager->persist($invoiceHasProduct);
        }
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices2[1]);
            $invoiceHasProduct->setProduct($products[$i+20]);
            $manager->persist($invoiceHasProduct);
        }
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices2[2]);
            $invoiceHasProduct->setProduct($products[$i + 24]);
            $manager->persist($invoiceHasProduct);
        }
        for ($i=0; $i < 4; $i++) { 
            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->setQuantity(1 + $i);
            $invoiceHasProduct->setInvoice($invoices2[3]);
            $invoiceHasProduct->setProduct($products[$i + 28]);
            $manager->persist($invoiceHasProduct);
        }

        
        
  
            $userAdmin = new Member();
            $userAdmin->setUsername('admin');
            $userAdmin->setCompany($company);
            $userAdmin->setPassword('admin');
            $userAdmin->setRole($roleAdmin);
            $manager->persist($userAdmin);


        $manager->flush();
    }

}