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

        $sarl = [ 'Intense PC','Société Lambda' ];
        
        $companies = [];
         $company1 = new Company();
            $company1->setCompanyName('Intense PC');
            $company1->setCompanyAdress('17, rue du Général Pépète');
            $company1->setPhone('0'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $company1->setFax('0'.(mt_rand(1, 5)).(mt_rand(1111111, 99999999)));
            $company1->setVatNumber('FR'.(mt_rand(111111111, 999999999)));
            $company1->setEmail('intensepc@gmail.com');
            $company1->setBankIban('FR'.(mt_rand(11111111, 99999999)).(mt_rand(11111111, 99999999)).(mt_rand(11111111, 99999999)).(mt_rand(111, 999)) );
            $company1->setBankBic(mt_rand(11111111111, 99999999999));
            $company1->setBankRib('65498725648');
            $company1->setCity($city[mt_rand(0, 6)]);
            $company1->setZipCode(mt_rand(11111, 99999));
            $company1->setBankDomiciliation('Crédit Agricole de '.($city[mt_rand(0, 6)]));
            $company1->setPaymentTerm('30'); //echeance en semaine (W en date php)
            $company1->setCompanyInformation('S.A au capital de 50.000€');
            $company1->setCountryCode('FR');
            $company1->setWebsite('www.intensePC.fr');
            $companies[] = $company1;            
            $manager->persist($company1);

            $company2 = new Company();
            $company2->setCompanyName('Société Lambda');
            $company2->setCompanyAdress((mt_rand(1, 75)).', route de '. ($city[mt_rand(0, 14)]));
            $company2->setPhone('0'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $company2->setFax('0'.(mt_rand(1, 5)).(mt_rand(1111111, 99999999)));
            $company2->setVatNumber('FR'.(mt_rand(111111111, 999999999)));
            $company2->setEmail('lambda@gmail.com');
            $company2->setBankIban('FR'.(mt_rand(11111111, 99999999)).(mt_rand(11111111, 99999999)).(mt_rand(11111111, 99999999)).(mt_rand(111, 999)) );
            $company2->setBankBic(mt_rand(11111111111, 99999999999));
            $company2->setBankRib('65498725648');
            $company2->setCity($city[mt_rand(0, 6)]);
            $company2->setZipCode(mt_rand(11111, 99999));
            $company2->setBankDomiciliation('Crédit Agricole de '.($city[mt_rand(0, 6)]));
            $company2->setPaymentTerm('30'); //echeance en semaine (W en date php)
            $company2->setCompanyInformation('Société Coopérative inscrite au RNC');
            $company2->setCountryCode('FR');
            $companies[] = $company2;            
            $manager->persist($company2);
        


        $pro = [true, false];

        $nom = ['GOUGEON','THOUVENIN','ROUYER','JEANNOT','BOURG','MICHOT','NATTEAU','BOITEL','LEPRINCE','FLAHAUT','TEIXIER','ETCHEVERRY','ABADIE','CANAL','WENDLING','SUTTER','RIVOIRE','GALMICHE','BOUILLOT','BOUTTIER'];
        $prenom = ['Christiane','Jean-Eude','Sidonie','Bertrand','Séverine','Philippe','Jean-Christophe','Lucie','Dario','Claire','Benjamin','Leslie','Jean-Eude','Stéphanie','Zinedine','Régina','Robert','Isabelle','Sébastien'];
        $custComp = ['SARL Podium Fleurs','Peintures Ramirez S.A','EURL Univers Bijoux','Instinc\'tif Coiffure','L\'eau Bleue Epicerie Bio','BricoStore SARL','Cabinet Médical HYPOCRATE','Tabac-Presse de la Gare','SOFICO Expertise-Comptable','Restaurant Le Bienheureux'];

        $customers1 = [];
        for ($i=0; $i < 10; $i++) { 
            $customer = new Customer();
            $pays = $country[mt_rand(0, 6)];
            $customer->setLastname($nom[mt_rand(0, 19)]);
            $customer->setFirstname($prenom[mt_rand(0, 18)]);
            $customer->setCompanyAdress((mt_rand(1, 75)).', route de '. ($city[mt_rand(0, 14)]));
            $customer->setZipCode(mt_rand(11111, 99999));
            $customer->setCity($city[mt_rand(0, 14)]);
            $customer->setCountryCode($pays);
            $customer->setPhone('+33'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setMobile('+33'.(mt_rand(6, 9)).(mt_rand(11111111, 99999999)));
            $customer->setFax('+33'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment('le client'.$i.' est sympa');
            $customer->setPro($pro[mt_rand(0,1)]);
            $customer->setCustomerCompany($custComp[$i]);
            $customer->setVatNumber($pays.(mt_rand(111111111, 999999999)));
            $customer->setRemise((mt_rand(0,1000))/100);
            $customer->setCompany($companies[0]);
            $customer->setActive(true);
            $customers1[] = $customer;
            $manager->persist($customer); 
        }

        $customer2 = [];
        for ($i=0; $i < 10; $i++) { 
            $customer = new Customer();
            $pays = $country[mt_rand(0, 6)];
            $customer->setLastname($nom[mt_rand(0, 18)]);
            $customer->setFirstname($prenom[mt_rand(0, 19)]);
            $customer->setCompanyAdress((mt_rand(1, 75)).', route de '. ($city[mt_rand(0, 14)]));
            $customer->setZipCode(mt_rand(11111, 99999));
            $customer->setCity($city[mt_rand(0, 14)]);
            $customer->setCountryCode($pays);
            $customer->setPhone('+33'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setMobile('+33'.(mt_rand(6, 9)).(mt_rand(11111111, 99999999)));
            $customer->setFax('+33'.(mt_rand(1, 5)).(mt_rand(11111111, 99999999)));
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment('le client'.$i.' est sympa');
            $customer->setPro($pro[mt_rand(0,1)]);
            $customer->setCustomerCompany($custComp[$i]);
            $customer->setVatNumber($pays.(mt_rand(111111111, 999999999)));
            $customer->setRemise((mt_rand(0,1000))/100);
            $customer->setCompany($companies[1]);
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

        $prod = ['Intel Core i7-8086K (4.0 GHz)'=>'Processeur Socket 1151 - Hexa Core - Cache 12 Mo - Coffee Lake - Ventirad non inclus'
            
        ];

        $products1 = []; 
            
            $product1 = new Product();
            $product1->setDenomination('Intel Core i7-8086K (4.0 GHz)');
            $product1->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product1->setDescription('Processeur Socket 1151 - Hexa Core - Cache 12 Mo - Coffee Lake - Ventirad non inclus');
            $product1->setPrice(445.90);
            $product1->setUnity('pièce');
            $product1->setActive(true);
            $product1->setCompany($companies[0]);
            $products1[] = $product1; 
            $manager->persist($product1);

            $product2 = new Product();
            $product2->setDenomination('AMD Ryzen 3 1300X (3.5 GHz)');
            $product2->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product2->setDescription('Processeur Socket AM4 - Quad Core - Cache 10 Mo - Summit Ridge');
            $product2->setPrice(119.90);
            $product2->setUnity('pièce');
            $product2->setActive(true);
            $product2->setCompany($companies[0]);
            $products1[] = $product2; 
            $manager->persist($product2);

            $product3 = new Product();
            $product3->setDenomination('Intel Celeron G4900 (3.1 GHz)');
            $product3->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product3->setDescription('Processeur Socket 1151 - Dual Core - Cache 2 Mo - Coffee Lake');
            $product3->setPrice(41.90);
            $product3->setUnity('pièce');
            $product3->setActive(true);
            $product3->setCompany($companies[0]);
            $products1[] = $product3; 
            $manager->persist($product3);

            $product4 = new Product();
            $product4->setDenomination('Sapphire Radeon RX 550 PULSE, 2 Go');
            $product4->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product4->setDescription('Carte graphique PCI-Express overclockée - Refroidissement semi-passif (mode 0 dB)');
            $product4->setPrice(109.90);
            $product4->setUnity('pièce');
            $product4->setActive(true);
            $product4->setCompany($companies[0]);
            $products1[] = $product4; 
            $manager->persist($product4);
            
            $product5 = new Product();
            $product5->setDenomination('Asus GeForce GTX 1060 ROG STRIX, 6 Go');
            $product5->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product5->setDescription('Carte graphique PCI-Express overclockée - Refroidissement semi-passif (mode 0 dB) - Avec backplate - Compatible VR');
            $product5->setPrice(379.90);
            $product5->setUnity('pièce');
            $product5->setActive(true);
            $product5->setCompany($companies[0]);
            $products1[] = $product5; 
            $manager->persist($product5);

            $product6 = new Product();
            $product6->setDenomination('KFA2 GeForce GTX 1080 Ti EXOC Black, 11 Go');
            $product6->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product6->setDescription('Carte graphique PCI-Express overclockée - Refroidissement semi-passif (mode 0 dB) - Avec backplate - Compatible VR');
            $product6->setPrice(769.90);
            $product6->setUnity('pièce');
            $product6->setActive(true);
            $product6->setCompany($companies[0]);
            $products1[] = $product6; 
            $manager->persist($product6);

            $product7 = new Product();
            $product7->setDenomination('MSI Z370 Gaming Pro Carbon');
            $product7->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product7->setDescription('Carte mère ATX - Socket 1151 - Chipset Intel Z370 - USB 3.1 - SATA 6 Gb/s - M.2 - LED intégrées');
            $product7->setPrice(169.90);
            $product7->setUnity('pièce');
            $product7->setActive(true);
            $product7->setCompany($companies[0]);
            $products1[] = $product7; 
            $manager->persist($product7);

            $product8 = new Product();
            $product8->setDenomination('Asus PRIME B350-PLUS');
            $product8->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product8->setDescription('Carte mère ATX - Socket AM4 - Chipset AMD B350 - USB 3.1 - SATA 6 Gb/s - M.2');
            $product8->setPrice(99.90);
            $product8->setUnity('pièce');
            $product8->setActive(true);
            $product8->setCompany($companies[0]);
            $products1[] = $product8; 
            $manager->persist($product8);

            $product9 = new Product();
            $product9->setDenomination('MSI X299 Tomahawk');
            $product9->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product9->setDescription('Carte mère ATX - Socket 2066 - Chipset Intel X299 - USB 3.1 - SATA 6 Gb/s - M.2 / U.2 - LED intégrées');
            $product9->setPrice(279.90);
            $product9->setUnity('pièce');
            $product9->setActive(true);
            $product9->setCompany($companies[0]);
            $products1[] = $product9; 
            $manager->persist($product9);

            $product10 = new Product();
            $product10->setDenomination('Cooler Master V1000, 1000W');
            $product10->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product10->setDescription('Alimentation PC Certifiée 80+ Gold - Modulaire - Compatible état C6/C7');
            $product10->setPrice(169.90);
            $product10->setUnity('pièce');
            $product10->setActive(true);
            $product10->setCompany($companies[0]);
            $products1[] = $product10; 
            $manager->persist($product10);
            
            $product11 = new Product();
            $product11->setDenomination('Thermaltake Smart RGB, 500W');
            $product11->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product11->setDescription('Alimentation PC Certifiée 80+ - Compatible état C6/C7');
            $product11->setPrice(44.95);
            $product11->setUnity('pièce');
            $product11->setActive(true);
            $product11->setCompany($companies[0]);
            $products1[] = $product11; 
            $manager->persist($product11);

            $product12 = new Product();
            $product12->setDenomination('EVGA 750 GQ, 750W');
            $product12->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product12->setDescription('Alimentation PC Certifiée 80+ Gold - Semi-modulaire - Semi-passive - Compatible état C6/C7');
            $product12->setPrice(99.90);
            $product12->setUnity('pièce');
            $product12->setActive(true);
            $product12->setCompany($companies[0]);
            $products1[] = $product12; 
            $manager->persist($product12);

            $product13 = new Product();
            $product13->setDenomination('DDR3 Ballistix Sport, 2 x 4 Go, 1600 MHz, CAS 9');
            $product13->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product13->setDescription('Kit Dual Channel - Mémoire DDR3 - PC-12800 - Low Profile');
            $product13->setPrice(445.90);
            $product13->setUnity('lot(2)');
            $product13->setActive(true);
            $product13->setCompany($companies[0]);
            $products1[] = $product13; 
            $manager->persist($product13);

            $product14 = new Product();
            $product14->setDenomination('DDR3 HyperX Savage Red, 4 x 8 Go, 2133 MHz, CAS 11');
            $product14->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product14->setDescription('Kit Quad Channel - Mémoire DDR3 - PC-17000 - Low-Profile');
            $product14->setPrice(369.90);
            $product14->setUnity('lot(4)');
            $product14->setActive(true);
            $product14->setCompany($companies[0]);
            $products1[] = $product14; 
            $manager->persist($product14);

            $product15 = new Product();
            $product15->setDenomination('DDR4 G.Skill Ripjaws V, Rouge, 2 x 4 Go, 2133 MHz, CAS 15');
            $product15->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product15->setDescription('Kit Dual Channel - Mémoire DDR4 - PC-17000');
            $product15->setPrice(88.90);
            $product15->setUnity('lot(2)');
            $product15->setActive(true);
            $product15->setCompany($companies[0]);
            $products1[] = $product15; 
            $manager->persist($product15);

            $product16 = new Product();
            $product16->setDenomination('Kit Dual Channel - Mémoire DDR4 - PC-17000');
            $product16->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product16->setDescription('Kit Quad Channel - Mémoire DDR4 optimisée AMD Ryzen - PC-19200 - Low-Profile');
            $product16->setPrice(219.90);
            $product16->setUnity('lot(4)');
            $product16->setActive(true);
            $product16->setCompany($companies[0]);
            $products1[] = $product16; 
            $manager->persist($product16);
            
            $product17 = new Product();
            $product17->setDenomination('Câble ethernet RJ45 Cat.5e - Blindé - Noir');
            $product17->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product17->setDescription('Câble ethernet RJ45 Mâle/Mâle');
            $product17->setPrice(7.90);
            $product17->setUnity('mètre');
            $product17->setActive(true);
            $product17->setCompany($companies[0]);
            $products1[] = $product17; 
            $manager->persist($product17);

            $product18 = new Product();
            $product18->setDenomination('Rallonge USB 2.0 amplifiée, 5m, M/F, Noir, TopAchat');
            $product18->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product18->setDescription('Composition : 1 x connecteur USB2 type A mâle - 1 connecteur USB2 type A femelle - 5m de Câble USB 2 amplifié, blindé 4 conducteurs');
            $product18->setPrice(69.90);
            $product18->setUnity('pièce');
            $product18->setActive(true);
            $product18->setCompany($companies[0]);
            $products1[] = $product18; 
            $manager->persist($product18);

            $product19 = new Product();
            $product19->setDenomination('Câble Thunderbolt 3 Noir ');
            $product19->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product19->setDescription('Câble Thunderbolt 3 (40 Gb/s) - Compatible USB Type C / DisplayPort - Charge jusqu\'à 60W');
            $product19->setPrice(29.90);
            $product19->setUnity('pièce');
            $product19->setActive(true);
            $product19->setCompany($companies[0]);
            $products1[] = $product19; 
            $manager->persist($product19);

            $product20 = new Product();
            $product20->setDenomination('Câble rallonge gainé ATX 4 broches BitFenix Alchemy, 45 cm, Bleu/Bleu');
            $product20->setReference(mt_rand(11, 99).'-'.(mt_rand(111111, 999999)));
            $product20->setDescription('Rallonge d\'alimentation CPU 12V - Pour une config au look unique et assorti à vos composants !');
            $product20->setPrice(7.90);
            $product20->setUnity('pièce');
            $product20->setActive(true);
            $product20->setCompany($companies[0]);
            $products1[] = $product20; 
            $manager->persist($product20);

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
            new Datetime('2018-06-25'),
            new Datetime('now'),
            new Datetime('2018-12-24')
        ];

        $invoices1 = [];
        
        for ($i=0; $i < 10; $i++) { 
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
            $invoice->setComment('client important : livrer en temps et en heure');
            $invoice->setLegalNotice('Veuillez contrôler l\'état des marchandises lors de la livraison');
            $invoice->setCustomer($customers1[$i]);
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
            $invoice->setCustomer($customers2[mt_rand(0,9)]);
            $invoice->setStatus($statut[mt_rand(0,4)]);
            $invoice->setCompany($companies[1]);
            $invoices2[] = $invoice;        
            $manager->persist($invoice);
        }

            
        for ($i=0; $i < 10; $i++) { 
                    
            for ($ind=0; $ind < (mt_rand(1, 6)); $ind++) { 
                $invoiceHasProduct = new InvoiceHasProduct();
                $invoiceHasProduct->setQuantity(mt_rand(1, 5));
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

