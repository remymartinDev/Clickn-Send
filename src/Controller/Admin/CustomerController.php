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
        
        $customers = $customerRepository->findInactivCustomers(1);

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
}