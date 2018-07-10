<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Entity\Company;
use App\Form\CustomerType;
use App\Repository\CustomerRepository;
use App\Repository\CompanyRepository;
use App\Service\ConfiguredSerializer;
use App\Service\InjectionEntity;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;



/**
 * @Route("/api/customer")
 */
class CustomerController extends Controller
{
    
    /**
     * @Route("s", name="customer_list", methods="GET")
     */
    public function list(CustomerRepository $customerRepository, ConfiguredSerializer $configuredSerializer): Response
    {
        
        $customers = $customerRepository->findActivCustomers(1);

        

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
     * @Route("/new", name="customer_new", methods="GET|POST")
     */
    public function new(Request $request, CompanyRepository $companyRepository, SerializerInterface $serializer, InjectionEntity $injectionEntity)
    {
        $data = $request->getContent();
        
        //hydrate an invoice object with data
        $customer = $serializer->deserialize($data, Customer::class, 'json');
        
        //take relational object for product
        $company = $companyRepository->findOneById(1);
        
        //set product
        $customer->setCompany($company);
        $customer->setActive(true);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($customer);
        $em->flush();

        $response = [
            'succes' => true,
            'id' => $customer->getId()
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("/{id}", name="customer_show", methods="GET")
     */
    public function show(Customer $customer, ConfiguredSerializer $configuredSerializer): Response
    {
        foreach ($customer->getInvoices() as $invoice) {
            $invoice->setCompany($invoice->getCompany()->getId());
            $invoice->delPayments();
        }

        foreach ($customer->getPayments() as $payment) {
            $payment->setInvoice($payment->getInvoice()->getId());
        }
      
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($customer, 'json');

        return new Response($json);
    }

    /**
     * @Route("/{id}/edit", name="customer_edit", methods="GET|POST")
     */
    public function edit(Request $request, Customer $customer, SerializerInterface $serializer, CustomerRepository $customerRepository): Response
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);

        //set product
        $customer->hydrate($data_array);
        
        $em = $this->getDoctrine()->getManager()->flush();

        $response = [
            'succes' => true,
            ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("/{id}", name="customer_delete", methods="DELETE")
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

     /**
     * @Route("/{id}/activ", name="customer_activ", methods="GET|POST")
     */
    public function activ(Request $request, Customer $customer, SerializerInterface $serializer): Response
    {    

        if ($customer->getActive()) {
            $customer->setActive(false);
        }
        else {
            $customer->setActive(true);
        }

        
        $this->getDoctrine()->getManager()->flush();

        $response = [
            'succes' => true,
            ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }
}
