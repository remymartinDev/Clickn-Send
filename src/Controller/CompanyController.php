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
use App\Repository\MemberRepository;


/**
 * @Route("/api/company")
 */
class CompanyController extends Controller 
{
    /**
     * @Route("/new", name="company_new", methods="POST")
     */
    public function new(Request $request, RoleRepository $roleRepo, SerializerInterface $serializerinter): Response
    {
        $fileup = $request->files->all();
        $data_array = $request->request->all();

        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer(array($normalizer));
        
        $company = $serializer->denormalize($data_array, Company::class);
        
        
        if ($company->getVatNumber() !== null) {
        $countryCode = preg_split("/[0-9]/",$company->getVatNumber());
        $company->setCountryCode($countryCode[0]);
        } 
        else { $company->setCountryCode('x');
        }
        //fuction for check if logo exist and set it to company
        $this->checkAndSetLogo("logo", $fileup, $company);

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
        $json = $serializerinter->serialize($response, 'json');
        return new Response($json); 
    }

    private function checkAndSetLogo($logoIndex, $fileup, $company)
    {
        if (array_key_exists($logoIndex, $fileup)) {
            $file = $fileup[$logoIndex];

            if ($company->getLogo() !== null && $file !== null && $file !== "") {
                unlink('data/logo/' . $company->getLogo());
            }

            $fileName = md5(uniqid()).'.'.$file->guessExtension();       
            $file->move(
                $this->getParameter('logo_directory'),
                $fileName
            );        
            $company->setLogo($fileName);

        }
    }

}
