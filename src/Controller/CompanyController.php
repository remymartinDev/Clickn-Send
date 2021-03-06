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
        
        if (array_key_exists("logo", $fileup)) {

            $file = $fileup["logo"];
            $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();       
            $file->move(
                $this->getParameter('brochures_directory'),
                $fileName
            );        
            $company->setLogo($fileName);

        }


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
        $form = $this->createForm(CompanyType::class, $company);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('company_edit', ['id' => $company->getId()]);
        }

        return $this->render('company/edit.html.twig', [
            'company' => $company,
            'form' => $form->createView(),
        ]);
    }


    private function generateUniqueFileName()
    {
        return md5(uniqid());
    }
}
