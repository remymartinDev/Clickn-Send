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
        /* $vatruleDE = new VatRules;
        $vatruleDE->setCountry('Allemagne');
        $vatruleDE->setCountryCode('DE');
        $vatruleDE->setVatFormat('999999999');	
        $vatruleDE->setVatFormatDigits('9 chiffres');
        $vatruleDE->setZeroRate('0');
        $vatruleDE->setLowRate1('7');
        $vatruleDE->setLowRate2('');
        $vatruleDE->setLowRate3('');
        $vatruleDE->setLowRate4('');
        $vatruleDE->setStandardRate('19'); */                
        
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

        $city = ['Paris','Marseille','Lyon','Toulouse','Nice','Nantes','Strasbourg','Montpellier','Bordeaux','Lille','Rennes','Reims','Le Havre','Saint-Étienne','Toulon'];       
        
        $country = ['FR','BE','LU','DE','ES','IT','NL'];

        $sarl = [ 'Clickn\'Send','Société Lambda' ];
        
        $companies = [];
        for ($i=0; $i < 2; $i++) { 
         $company = new Company();
            $company->setCompanyName($sarl[$i]);
            $company->setCompanyAdress((4 + $i).', rue du Général Pépète');
            $company->setPhone('0'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $company->setFax('0'.(mt_rand(1, 5)).(mt_rand(1111111, 99999999)));
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
            $company->setCountryCode('FR');
            $companies[] = $company;            
            $manager->persist($company);
        }


        $pro = [true, false];

        $nom = ['GOUGEON','THOUVENIN','ROUYER','JEHANNO','BOUR','MICHOT','NATTEAU','BOITEL','LEPRINCE','FLAHAUT','TIXIER','ETCHEVERRY','ABADIE','CANAL','WENDLING','SUTTER','RIVOIRE','GALMICHE','BOUILLOT','BOUTTIER'];
        $prenom = [];

        $customers1 = [];
        for ($i=0; $i < 6; $i++) { 
            $customer = new Customer();
            $pays = $country[mt_rand(0, 6)];
            $customer->setLastname($nom[mt_rand(0, 19)]);
            $customer->setFirstname('Firstname'.$i);
            $customer->setCompanyAdress((1 + $i).', route de '. $city[mt_rand(0, 14)]);
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
            $customer->setCompanyAdress((1 + $i).', route de '. $city[mt_rand(0, 14)]);
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
            'lot(6)'
        ];


        $tva = [
            '5.50',
            '10.00',
            '20.00'
        ];

        $lorem = [
            'Priscis pertinacior est Aginatium est fides est pertinacior super nunc ulla explanare locuta fides maioribus fides est arbitror arbitror causam',
            'Quidem suspicionibus suspicionibus te publicae reique M cepit in sed tuo gravissimo ante praesertim senatus enim gravissimo me rei senatui',
            'Quasdam itidemque Caesaream Caesaream ad nulli Syriarum et ad egregias exaedificavit nullam exaedificavit nulli egregias aemulas: aevo quam protenta abundans',
            'Solet salutis quicquid insontium fecit luctuosam insontium etiam aut angustus offensis animus ita tener salutis existimans et angustus aut ita',
            'Restituit qui mihi qui mihi quod perennis impendentibus incredibili capitis cum quodam amore ac cum in reducit in periculis viderem',
            'Ob Orfitus minus urbem huius sese ad prudens dignitatis liberalium ultra oppido vulgus sunt minus excitatur decuerat haec haec vulgus'
        ];

        $prod = [
            
        ];

        $products1 = [];
        for ($i=0; $i < 20; $i++) { 
            $product = new Product();
            $product->setDenomination('Le Produit n°'.(1 + $i));
            $product->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product->setDescription($lorem[mt_rand(0, 5)]);
            $product->setPrice((mt_rand(2000, 23000))/100);
            $product->setUnity($unit[mt_rand(0,4)]);
            $product->setActive(true);
            $product->setCompany($companies[0]);
            $products1[] = $product; 
            $manager->persist($product);
        }

        $products2 = []; 
        for ($i=0; $i < 20; $i++) { 
            $product = new Product();
            $product->setDenomination('Le Produit n°'.(1 + $i));
            $product->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product->setDescription($lorem[mt_rand(0, 5)]);
            $product->setPrice((mt_rand(2000, 23000))/100);
            $product->setUnity($unit[mt_rand(0,4)]);
            $product->setActive(true);
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
            $invoice->setReference('18'.(mt_rand(1, 12)).'-'.(mt_rand(1, 31)).'-'.(mt_rand(00, 24)).(mt_rand(00, 60)).(mt_rand(00, 60)));
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
            $invoice->setReference('18'.(mt_rand(1, 12)).'-'.(mt_rand(1, 31)).'-'.(mt_rand(00, 24)).(mt_rand(00, 60)).(mt_rand(00, 60)));
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
                $invoiceHasProduct->setAmountDuttyFree(mt_rand(2000, 99999)/100);
                $invoiceHasProduct->setTaxesAmount(mt_rand(200, 9999)/100);
                $invoiceHasProduct->setAmountAllTaxes(mt_rand(2000, 99999)/100);
                $manager->persist($invoiceHasProduct);
            }
        }
        for ($i=0; $i < 8; $i++) { 
                    
            for ($ind=0; $ind < (mt_rand(1, 6)); $ind++) { 
                $invoiceHasProduct = new InvoiceHasProduct();
                $invoiceHasProduct->setQuantity(mt_rand(1, 10));
                $invoiceHasProduct->setInvoice($invoices2[$i]);
                $invoiceHasProduct->setProduct($products2[mt_rand(0,19)]);
                $invoiceHasProduct->setAmountDuttyFree(mt_rand(2000, 99999)/100);
                $invoiceHasProduct->setTaxesAmount(mt_rand(200, 9999)/100);
                $invoiceHasProduct->setAmountAllTaxes(mt_rand(2000, 99999)/100);
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

            $admin = new Member;
            $admin->setCompany($companies[0]);
            $admin->addRole('ROLE_ADMIN');
            $admin->setEnabled(true);
            $admin->setUsername('admin');
            $admin->setPlainPassword('admin');
            $admin->setEmail('admin@admin.com');
            $manager->persist($admin);

            $userFull = new Member;
            $userFull->setCompany($companies[0]);
            $userFull->addRole('ROLE_FULL');
            $userFull->setEnabled(true);
            $userFull->setUsername('userFull');
            $userFull->setPlainPassword('userFull');
            $userFull->setEmail('userFull@userFull.com');
            $manager->persist($userFull);

            $userRog = new Member;
            $userRog->setCompany($companies[0]);
            $userRog->addRole('ROLE_ROG');
            $userRog->setEnabled(true);
            $userRog->setUsername('userRog');
            $userRog->setPlainPassword('userRog');
            $userRog->setEmail('userRog@userRog.com');
            $manager->persist($userRog);

            $userRol = new Member;
            $userRol->setCompany($companies[0]);
            $userRol->addRole('ROLE_ROL');
            $userRol->setEnabled(true);
            $userRol->setUsername('userRol');
            $userRol->setPlainPassword('userRol');
            $userRol->setEmail('userRol@userRol.com');
            $manager->persist($userRol);



            $admin2 = new Member;
            $admin2->setCompany($companies[1]);
            $admin2->addRole('ROLE_ADMIN');
            $admin2->setEnabled(true);
            $admin2->setUsername('admin2');
            $admin2->setPlainPassword('admin2');
            $admin2->setEmail('admin2@admin.com');
            $manager->persist($admin2);

            $userFull2 = new Member;
            $userFull2->setCompany($companies[1]);
            $userFull2->addRole('ROLE_FULL');
            $userFull2->setEnabled(true);
            $userFull2->setUsername('userFull2');
            $userFull2->setPlainPassword('userFull2');
            $userFull2->setEmail('userFull2@userFull.com');
            $manager->persist($userFull2);

            $userRog2 = new Member;
            $userRog2->setCompany($companies[1]);
            $userRog2->addRole('ROLE_ROG');
            $userRog2->setEnabled(true);
            $userRog2->setUsername('userRog2');
            $userRog2->setPlainPassword('userRog2');
            $userRog2->setEmail('userRog2@userRog.com');
            $manager->persist($userRog2);

            $userRol2 = new Member;
            $userRol2->setCompany($companies[1]);
            $userRol2->addRole('ROLE_ROL');
            $userRol2->setEnabled(true);
            $userRol2->setUsername('userRol2');
            $userRol2->setPlainPassword('userRol2');
            $userRol2->setEmail('userRol2@userRol.com');
            $manager->persist($userRol2);

        $manager->flush();
    }

}
