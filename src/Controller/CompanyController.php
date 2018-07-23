<?php

namespace App\Controller;

use App\Entity\Company;
use App\Form\CompanyType;
use App\Repository\CompanyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ConfiguredSerializer;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Member;
use App\Repository\RoleRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\HttpFoundation\File\UploadedFile;


/**
 * @Route("/api/company")
 */
class CompanyController extends Controller 
{
    /**
     * @Route("/new", name="company_new", methods="GET|POST")
     */
    public function new(Request $request, RoleRepository $roleRepo): Response
    {
        $fileup = $request->files->all();
        $data_array = $request->request->all();

        //$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer(array($normalizer));
        
        $company = $serializer->denormalize($data_array, Company::class);
           
        $countryCode = preg_split("/[0-9]/",$company->getVatNumber());
        $company->setCountryCode($countryCode[0]);
        
        //fuction for check if logo exist and set it to company
        $this->checkAndSetLogo("logo", $fileup);

        $em = $this->getDoctrine()->getManager();
        $em->persist($company);
        $em->flush();

        $member = new Member;
        $member->setCompany($company);
        $member->setSuperAdmin(true);
        $member->setUsername($data_array['_username']);
        $member->setPlainPassword($data_array['_password']);
        $member->setEmail($data_array['email']);

        $em->persist($member);
        $em->flush();

        $response = [
            'succes' => true,
            'id' => $company->getId()
            ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json); 
    }

    /**
     * @Route("/admin", name="company_show", methods="GET")
     */
    public function show(ConfiguredSerializer $configuredSerializer): Response
    {
        $company = $this->getUser()->getCompany();
        
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($company, 'json');

        return new Response($json);
    }

    /**
     * @Route("/admin/edit", name="company_edit", methods="GET|POST")
     */
    public function edit(Request $request, Company $company): Response
    {
        $fileup = $request->files->all();
        $data_array = $request->request->all();

        //fuction for check if logo exist and set it to company
        $this->checkAndSetLogo("logo", $fileup);

        $company->hydrate($data_array);

        foreach ($company->getMembers() as $member) {
            $member->hydrate();
        }

        $this->getDoctrine()->getManager()->flush();
    }

    private function checkAndSetLogo($logoIndex, $fileup)
    {
        if (array_key_exists($logoIndex, $fileup)) {

            $file = $fileup[$logoIndex];
            $fileName = md5(uniqid()).'.'.$file->guessExtension();       
            $file->move(
                $this->getParameter('logo_directory'),
                $fileName
            );        
            $company->setLogo($fileName);

        }
    }
}
