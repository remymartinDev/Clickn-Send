<?php

namespace App\Controller;

use App\Entity\Member;
use App\Form\MemberType;
use App\Repository\MemberRepository;
use App\Repository\CompanyRepository;
use App\Repository\RoleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ConfiguredSerializer;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/admin/member")
 */
class MemberController extends Controller
{
    /**
     * @Route("s", name="member_list", methods="GET")
     */
    public function list(MemberRepository $memberRepository, ConfiguredSerializer $configuredSerializer): Response
    {
        $Members = $memberRepository->findByCompany(1);
        
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($Members, 'json');

        return new Response($json);
    }

    /**
     * @Route("/new", name="member_new", methods="GET|POST")
     */
    public function new(Request $request, SerializerInterface $serializer, CompanyRepository $companyRepository, RoleRepository $roleRepository): Response
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);
        
        //hydrate an member object with data
        $member = $serializer->deserialize($data, Member::class, 'json');
        
        //take relational object for member
        $company = $companyRepository->findOneById(1);
        $role = $roleRepository->findOneById($data_array['role']['id']);
        
        //set member
        $member->setCompany($company);
        $member->setRole($role);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($member);
        $em->flush();

        $succes = true;
        $json = $serializer->serialize($succes, 'json');
        return new Response($json);
    }

    /**
     * @Route("/{id}", name="member_show", methods="GET")
     */
    public function show(Member $member, ConfiguredSerializer $configuredSerializer)
    {
      //on utilise un service créé par nos soin pour configurer le serializer
      $json = $configuredSerializer->getConfiguredSerializer()->serialize($member, 'json');
      
      return new Response($json);
    }

    /**
     * @Route("/{id}/edit", name="member_edit", methods="GET|POST")
     */
    public function edit(Request $request, Member $member): Response
    {
        $form = $this->createForm(MemberType::class, $member);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('member_edit', ['id' => $member->getId()]);
        }

        return $this->render('member/edit.html.twig', [
            'member' => $member,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="member_delete", methods="DELETE")
     */
    public function delete(Request $request, Member $member): Response
    {
       /*  if ($this->isCsrfTokenValid('delete'.$member->getId(), $request->request->get('_token'))) { */
            $em = $this->getDoctrine()->getManager();
            $em->remove($member);
            $em->flush();
        /* } */

        $succes = true;
        $json = $serializer->serialize($succes, 'json');
        return new Response($json);
    }
}
