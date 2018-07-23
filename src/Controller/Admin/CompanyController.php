<?php

namespace App\Controller\Admin;

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
 * @Route("/api/company/admin")
 */
class CompanyController extends Controller 
{
    /**
     * @Route("/", name="company_show", methods="GET")
     */
    public function show(ConfiguredSerializer $configuredSerializer): Response
    {
        $company = $this->getUser()->getCompany();
        
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($company, 'json');

        return new Response($json);
    }

    /**
     * @Route("/edit", name="company_edit", methods="GET|POST")
     */
    public function edit(Request $request, MemberRepository $memberRepository, SerializerInterface $serializer): Response
    {
        $fileup = $request->files->all();
        $data_array = $request->request->all();
        $company = $this->getUser()->getCompany();
        
        
        
        $em = $this->getDoctrine()->getManager();
        
        //fuction for check if logo exist and set it to company
        $this->checkAndSetLogo("logo", $fileup, $company);
        
        $company->hydrate($data_array);
        
        //if we have one member by company (beta)
        $member = $memberRepository->findOneByCompany($company);
        $member->setUsername($data_array['_username']);
        $member->setEmail($data_array['email']);
/*         foreach ($data_array['member'] as $member_data) {

            if (array_key_exists('id', $member_data)) {
                $member = $memberRepository->findOneBy($member_data['id']);
                $member->hydrate($member_data);
            }else {
                $member = new Member();
                $member->hydrate($member_data);
                $member->setCompany($company);
                $em->persist($member);
            }

        } */

       $em->flush();

       $response = [
        'succes' => true,
        ];

        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("/delete", name="company_delete", methods="DELETE")
     */
    public function delete(Request $request, SerializerInterface $serializerinter)
    {
        if ($this->getUser()->getRoles()[0] === "ROLE_ADMIN") {
            $em = $this->getDoctrine()->getManager();
            $em->remove($this->getUser()->getCompany());
            $em->flush();
            
            $response = [
                    'succes' => true,
                ];
            }else{
                $response = [
                    'succes' => false,
                    'error' => 'vous devez etre connecté en temps qu admin, pour supprimer votre compte'
                ];
            }
            $json = $serializerinter->serialize($response, 'json');
            return new Response($json);
    }
    
    private function checkAndSetLogo($logoIndex, $fileup, $company)
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
