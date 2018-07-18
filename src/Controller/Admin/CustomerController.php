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
     * @Route("s", name="customer_list", methods="GET")
     */
    public function listInactiv(CustomerRepository $customerRepository, ConfiguredSerializer $configuredSerializer): Response
    {
        
        $companyId = $this->getUser()->getCompany()->getId();
        $customers = $customerRepository->findInactivCustomers($companyId);

        foreach ($customers as $customer) {

            foreach ($customer->getInvoices() as $invoice) {
                $invoice->setCompany($customer->getCompany()->getId());
                $invoice->delPayments();
            }
            
            foreach ($customer->getPayments() as $payment) {
                $payment->setInvoice($payment->getInvoice()->getId());
            }
        }

        $json = $configuredSerializer->getConfiguredSerializer()->serialize($customers, 'json');

        return new Response($json);
    }

     /**
     * @Route("/{id}/delete", name="customer_delete", methods="DELETE")
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