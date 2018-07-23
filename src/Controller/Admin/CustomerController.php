<?php

namespace App\Controller\Admin;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use App\Service\ConfiguredSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;



/**
 * @Route("/api/admin/customer")
 */
class CustomerController extends Controller
{
    
     /**
     * @Route("/{id}/delete", name="customer_delete", methods="GET")
     */
    public function delete(Request $request, Customer $customer, SerializerInterface $serializer): Response
    {
       /*  if ($this->isCsrfTokenValid('delete'.$customer->getId(), $request->request->get('_token'))) { */
            $em = $this->getDoctrine()->getManager();
            $em->remove($customer);
            $em->flush();
      /*   } */
      $response = [
        'succes' => true,
        ];
    $json = $serializer->serialize($response, 'json');
    return new Response($json);
    }
}