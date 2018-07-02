<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\Answer;
use App\Entity\Question;
use App\Entity\Role;
use App\Entity\Tag;
use App\Entity\User;

use Faker;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {

        
        for ($i=0; $i < 1; $i++) { 
         $company = new Company();
            $company->setCompanyName('company name'. $i);
            $company->setCompanyAdress('company adress'. $i);
            $company->setPhone('+334502835'. $i);
            $company->setFax('+33520154'. $i);
            $company->setVatNumber('61565126'. $i);
            $company->setEmail('company'. $i .'@gmail.com');
            $company->setBankIban('53135435'. $i);
            $company->setBankBic('65654' . $i . '132');
            $company->setBankRib($i.'2'.$i.'3'.$i.'5'.$i);
            $company->setBankDomiciliation('company bank'. $i);
            $company->setPaymentTerm('4'); //echeance en semaine (W en date php)
            $company->setLogo();
            $manager->persist($company);
        }

        for ($i=0; $i < 5; $i++) { 
            $customer = new Customer();
            $customer->setLastname('customer lastname'.$i);
            $customer->setFirstname('customer firstname'.$i);
            $customer->setCompanyAdress('customer adress'.$i);
            $customer->setCountryCode('customer country'.$i);
            $customer->setPhone('01'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setMobile('06'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setFax('08'.$i.'2'.$i.'5'.$i.'7'.$i.'4');
            $customer->setEmail('customer'.$i.'@mail');
            $customer->setComment();
            $customer->setPro();
            $customer->setCompanyName();
            $customer->setVatNumber();
            $customer->setRemise();
            $customer->setCompany($company);
            $manager->persist($customer); 
        }







        $roleUser = new Role();
        $roleUser->setRolename('ROLE_USER');
        $roleUser->setLabel('Utilisateur');
        $roleModo = new Role();
        $roleModo->setRolename('ROLE_MODO');
        $roleModo->setLabel('Moderateur');
        $roleAdmin = new Role();
        $roleAdmin->setRolename('ROLE_ADMIN');
        $roleAdmin->setLabel('Administrateur');

        $userAdmin = new User();
        $userAdmin->setUsername('admin');
        $userAdmin->setEmail('admin@faqoclock.com');
        $userAdmin->setPassword($this->encoder->encodePassword($userAdmin, 'admin'));
        $userAdmin->setRole($roleAdmin);
       
        $userUser5 = new User();
        $userUser5->setUsername('user5');
        $userUser5->setEmail('user5@faqoclock.com');
        $userUser5->setPassword($this->encoder->encodePassword($userUser5, 'user5'));
        $userUser5->setRole($roleUser);

        $question1 = new Question();
        $question1->setTitle('le fils de qui?');
        $question1->setBody('Si Jésus c\'est le fils de Dieu, Dieu c\'est le fils de qui ?');
        $question1->setBlocked('0');
        $question1->setUser($userUser2);

       



        $manager->persist($roleUser);
  

        $manager->flush();
    }
}
