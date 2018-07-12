<?php

namespace App\DataFixtures;

use \Datetime;
use Faker\Factory;
use App\Entity\Role;
use App\Entity\Member;
use App\Entity\Status;
use App\Entity\Company;

use App\Entity\Invoice;
use App\Entity\Payment;
use App\Entity\Product;
use App\Entity\Customer;
use App\Entity\PaymentMethod;
use App\Entity\InvoiceHasProduct;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


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

        $statut = [
            $devis,
            $devisRefuse,
            $brouillon,
            $facture,
            $factureRecurrente
        ];

       


        $cb = new PaymentMethod();
        $cb->setMethod('carte bleue');
        $manager->persist($cb);

        $especes = new PaymentMethod();
        $especes->setMethod('espèces');
        $manager->persist($especes);

        $cheque = new PaymentMethod();
        $cheque->setMethod('chèque');
        $manager->persist($cheque);

        $virement = new PaymentMethod();
        $virement->setMethod('virement bancaire');
        $manager->persist($virement);

        $BOR = new PaymentMethod();
        $BOR->setMethod('Billet à Ordre Relevé(BOR)');
        $manager->persist($BOR);

        $paymentMethods = [
            $cb, 
            $especes, 
            $cheque, 
            $virement,
            $BOR
        ];

        $city = [
            'Paris',
            'Marseille',
            'Lyon',
            'Toulouse',
            'Nice',
            'Nantes',
            'Strasbourg',
            'Montpellier',
            'Bordeaux',
            'Lille',
            'Rennes',
            'Reims',
            'Le Havre',
            'Saint-Étienne',
            'Toulon',
        ];       
        
        $country = [
            'FR',
            'BE',
            'LU',
            'DE',
            'ES',
            'IT',
            'NL'
        ];

        $sarl = [
            'Clickn\'Send',
            'Société Lambda'
        ];
        
        $companies = [];
        for ($i=0; $i < 2; $i++) { 
         $company = new Company();
            $company->setCompanyName($sarl[$i]);
<<<<<<< HEAD
            $company->setCompanyAdress((4 + $i).', rue du Général Pépète');
            $company->setPhone('0'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $company->setFax('0'.(mt_rand(1, 5)).(mt_rand(1111111, 99999999)));
=======
            $company->setCompanyAdress((4 + $i).' rue du Général Pépète');
            $company->setPhone('+334502835'. $i);
            $company->setFax('+33520154'. $i);
>>>>>>> e19f2e54d1740085f240a1cb30f4f141308de59d
            $company->setVatNumber('FR'.(mt_rand(111111111, 999999999)));
            $company->setEmail(($sarl[$i]).'@gmail.com');
            $company->setBankIban('FR'.(mt_rand(11111111, 99999999)).(mt_rand(11111111, 99999999)).(mt_rand(11111111, 99999999)).(mt_rand(111, 999)) );
            $company->setBankBic(mt_rand(11111111111, 99999999999));
            $company->setBankRib($i.'2'.$i.'3'.$i.'5'.$i);
            $company->setCity($city[mt_rand(0, 6)]);
            $company->setZipCode(mt_rand(11111, 99999));
            $company->setBankDomiciliation('Crédit Agricole de '.($city[mt_rand(0, 6)]));
            $company->setPaymentTerm('4'); //echeance en semaine (W en date php)
            $company->setCompanyInformation('SARL au capital de 50.000€');
            $company->setCountryCode('Fr');
            $companies[] = $company;            
            $manager->persist($company);
        }


        $pro = [
            true,
            false
        ];

        $customers1 = [];
        for ($i=0; $i < 6; $i++) { 
            $customer = new Customer();
            $pays = $country[mt_rand(0, 6)];
            $customer->setLastname('LASTNAME'.$i);
            $customer->setFirstname('Firstname'.$i);
            $customer->setCompanyAdress(1 + $i.', rue du customer '. 1 + $i);
            $customer->setZipCode(mt_rand(11111, 99999));
            $customer->setCity($city[mt_rand(0, 6)]);
            $customer->setCountryCode($pays);
            $customer->setPhone('+33'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setMobile('+33'.(mt_rand(6, 9)).(mt_rand(11111111, 99999999)));
            $customer->setFax('+33'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment('le client'.$i.' est sympa');
            $customer->setPro($pro[mt_rand(0,1)]);
            $customer->setCustomerCompany('SARL du client' .$i);
            $customer->setVatNumber($pays.(mt_rand(111111111, 999999999)));
            $customer->setRemise((mt_rand(0,1000))/100);
            $customer->setCompany($companies[0]);
            $customer->setActive(true);
            $customers1[] = $customer;
            $manager->persist($customer); 
        }

        $customer2 = [];
        for ($i=0; $i < 6; $i++) { 
            $customer = new Customer();
            $pays = $country[mt_rand(0, 6)];
            $customer->setLastname('LASTNAME'.$i);
            $customer->setFirstname('Firstname'.$i);
            $customer->setCompanyAdress(1 + $i.', rue du customer'. 1 + $i);
            $customer->setZipCode(mt_rand(01000, 99999));
            $customer->setCity($city[mt_rand(0, 6)]);
            $customer->setCountryCode($pays);
            $customer->setPhone('0'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setMobile('0'.(mt_rand(6, 9)).(mt_rand(11111111, 99999999)));
            $customer->setFax('0'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment('le client'.$i.' est sympa');
            $customer->setPro($pro[mt_rand(0,1)]);
            $customer->setCustomerCompany('SARL du client ' .$i);
            $customer->setVatNumber($pays.(mt_rand(111111111, 999999999)));
            $customer->setRemise((mt_rand(0,1000))/100);
            $customer->setCompany($companies[0]);
            $customer->setActive(true);
            $customers2[] = $customer;
            $manager->persist($customer); 
        }

        $unit = [
            'litre',
            'pièce',
            'm²',
            'kg',
            'lot (6)'
        ];


        $tva = [
            '5.50',
            '10.00',
            '20.00'
        ];

        $products1 = [];
        for ($i=0; $i < 20; $i++) { 
            $product = new Product();
            $product->setDenomination('Le Produit n°'.(1 + $i));
            $product->setReference('XZ'.(mt_rand(111111, 999999)));
            $product->setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');;
            $product->setPrice((mt_rand(2000, 23000))/100);
            $product->setUnity($unit[mt_rand(0,4)]);
            $product->setActive(true);
            $product->setVatRate($tva[mt_rand(0,2)]);
            $product->setCompany($companies[0]);
            $products1[] = $product; 
            $manager->persist($product);
        }

        $products2 = []; 
        for ($i=0; $i < 20; $i++) { 
            $product = new Product();
            $product->setDenomination('Le Produit n°'.(1 + $i));
            $product->setReference('XZ'.(mt_rand(111111, 999999)));
            $product->setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');;
            $product->setPrice((mt_rand(2000, 23000))/100);
            $product->setUnity($unit[mt_rand(0,4)]);
            $product->setActive(true);
            $product->setVatRate($tva[mt_rand(0,2)]);
            $product->setCompany($companies[1]);
            $products2[] = $product; 
            $manager->persist($product);
        }

        $deadlines = [
            new Datetime('2014-01-01'),
            new Datetime('now'),
            new Datetime('2030-12-24')
        ];

        $invoices1 = [];
        
        for ($i=0; $i < 8; $i++) { 
            $invoice = new Invoice();
            $invoice->setDate(new DateTime(mt_rand(2014, 2017).'-'.mt_rand(01, 12).'-'.mt_rand(01, 31)));
            $invoice->setReference('78'.$i.'12'.$i.'5'.$i.'4'.$i.'3');
            $invoice->setAmountAllTaxes(mt_rand(200, 1500));
            $invoice->setAmountDuttyFree(mt_rand(150, 1450));
            $invoice->setTaxesAmount(mt_rand(50, 450));
            $invoice->setPaid(false);
            $invoice->setDownPayment(mt_rand(20, 900));
            $invoice->setReminder(0);
            $invoice->setDeadline1($deadlines[mt_rand(0,2)]);
            //$invoice->setDeadline2();
            $invoice->setComment('je sens qu\'il la paiera jamais : faire gaffe !');
            $invoice->setLegalNotice('Mentions Légales: merci de songer à payer cette facture dans les délais');
            $invoice->setCustomer($customers1[mt_rand(0,5)]);
            $invoice->setStatus($statut[mt_rand(0,4)]);
            $invoice->setCompany($companies[0]);
            $invoices1[] = $invoice;        
            $manager->persist($invoice);
        }

        $invoices2 = [];
        
        for ($i=0; $i < 8; $i++) { 
            $invoice = new Invoice();
            $invoice->setDate(new DateTime(mt_rand(2014, 2017).'-'.mt_rand(01, 12).'-'.mt_rand(01, 31)));
            $invoice->setReference('78'.$i.'12'.$i.'5'.$i.'4'.$i.'3');
            $invoice->setAmountAllTaxes(mt_rand(200, 1500));
            $invoice->setAmountDuttyFree(mt_rand(150, 1450));
            $invoice->setTaxesAmount(mt_rand(50, 450));
            $invoice->setPaid(false);
            $invoice->setDownPayment(mt_rand(20, 900));
            $invoice->setReminder(0);
            $invoice->setDeadline1($deadlines[mt_rand(0,2)]);
            //$invoice->setDeadline2();
            $invoice->setComment('je sens qu\'il la paiera jamais : faire gaffe !');
            $invoice->setLegalNotice('Mentions Légales: merci de songer à payer cette facture dans les délais');
            $invoice->setCustomer($customers2[mt_rand(0,5)]);
            $invoice->setStatus($statut[mt_rand(0,4)]);
            $invoice->setCompany($companies[1]);
            $invoices2[] = $invoice;        
            $manager->persist($invoice);
        }

            
        for ($i=0; $i < 8; $i++) { 
                    
            for ($ind=0; $ind < (mt_rand(1, 6)); $ind++) { 
                $invoiceHasProduct = new InvoiceHasProduct();
                $invoiceHasProduct->setQuantity(mt_rand(1, 10));
                $invoiceHasProduct->setInvoice($invoices1[$i]);
                $invoiceHasProduct->setProduct($products1[mt_rand(0,19)]);
                $manager->persist($invoiceHasProduct);
            }
        }
        for ($i=0; $i < 8; $i++) { 
                    
            for ($ind=0; $ind < (mt_rand(1, 6)); $ind++) { 
                $invoiceHasProduct = new InvoiceHasProduct();
                $invoiceHasProduct->setQuantity(mt_rand(1, 10));
                $invoiceHasProduct->setInvoice($invoices2[$i]);
                $invoiceHasProduct->setProduct($products2[mt_rand(0,19)]);
                $manager->persist($invoiceHasProduct);
            }
        }


       for ($i=0; $i < 12; $i++) { 
            $payment1 = new Payment();
            $payment1->setDate(new DateTime(mt_rand(2014, 2017).'-'.mt_rand(01, 12).'-'.mt_rand(01, 31)));
            $payment1->setAmount(mt_rand(50, 599));
            $payment1->setPaymentMethode($paymentMethods[mt_rand(0, 4)]);
            $payment1->setCustomer($customers1[mt_rand(0, 3)]);
            $payment1->setInvoice($invoices1[mt_rand(0, 3)]);
            $payment1->setCompany(($companies[0]));
            $manager->persist($payment1);
        }
        
        for ($i=0; $i < 12; $i++) { 
            $payment2 = new Payment();
            $payment2->setDate(new DateTime(mt_rand(2014, 2017).'-'.mt_rand(01, 12).'-'.mt_rand(01, 31)));
            $payment2->setAmount(mt_rand(50, 599));
            $payment2->setPaymentMethode($paymentMethods[mt_rand(0, 4)]);
            $payment2->setCustomer($customers2[mt_rand(0, 3)]);
            $payment2->setInvoice($invoices2[mt_rand(0, 3)]);
            $payment2->setCompany(($companies[1]));
            $manager->persist($payment2);
        }
        
  
            $userAdmin = new Member();
            $userAdmin->setUsername('admin');
            $userAdmin->setCompany($companies[0]);
            $userAdmin->setPassword('admin');
            $userAdmin->setRole($roleAdmin);
            $manager->persist($userAdmin);

            $userUserFull = new Member();
            $userUserFull->setUsername('UserFull');
            $userUserFull->setCompany($companies[0]);
            $userUserFull->setPassword('UserFull');
            $userUserFull->setRole($roleFull);
            $manager->persist($userUserFull);

            $userUserRog = new Member();
            $userUserRog->setUsername('UserRog');
            $userUserRog->setCompany($companies[0]);
            $userUserRog->setPassword('UserRog');
            $userUserRog->setRole($roleRog);
            $manager->persist($userUserRog);

            $userUserRol = new Member();
            $userUserRol->setUsername('UserRol');
            $userUserRol->setCompany($companies[0]);
            $userUserRol->setPassword('UserRol');
            $userUserRol->setRole($roleRol);
            $manager->persist($userUserRol);


        $manager->flush();
    }

}
