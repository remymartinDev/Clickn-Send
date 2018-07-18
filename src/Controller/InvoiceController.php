<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Form\InvoiceType;
use App\Repository\InvoiceRepository;
use App\Repository\StatusRepository;
use App\Repository\CustomerRepository;
use App\Repository\CompanyRepository;
use App\Service\ConfiguredSerializer;
use App\Service\InjectionEntity;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\InvoiceHasProduct;
use App\Repository\ProductRepository;
use App\Repository\InvoiceHasProductRepository;


/**
 * @Route("/api/invoice")
 */
class InvoiceController extends Controller
{
    
    /**
     * @Route("s", name="invoice_list", methods="GET")
     */
    public function list(InvoiceRepository $invoiceRepository, ConfiguredSerializer $configuredSerializer)
    {
        $companyId = $this->getUser()->getCompany()->getId();
        $invoices = $invoiceRepository->findByCompany($companyId);

        foreach ($invoices as $invoice) {
            $invoice->getCustomer()->setCompany(null);
            $invoice->getCustomer()->delPayments();
            $invoice->delPayments();
            $invoice->delInvoiceHasProduct();
        }
        
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($invoices, 'json');

        return new Response($json);
    }

    /**
     * @Route("/new", name="invoice_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, CompanyRepository $companyRepository, CustomerRepository $customerRepository, StatusRepository $statusRepository, ProductRepository $productRepository): Response
    {
        
        $data = $request->getContent();
        $data_array = json_decode($data, true);
        
        $em = $this->getDoctrine()->getManager();

        //hydrate an invoice object with data
        $invoice = $serializer->deserialize($data, Invoice::class, 'json');

        //take relational object for invoice 
        $customer = $customerRepository->findOneById($data_array['customer']);
        $status = $statusRepository->findOneById($data_array['status']);
        $company = $this->getUser()->getCompany();
        
        $invoice->hydrate($customer, $status, $company);
        
        $em->persist($invoice);
        $em->flush();

        //set invoice has product
        foreach ($data_array['invoiceHasProducts'] as $datas) {
            
            $product = $productRepository->findOneById($datas['product']);

            $invoiceHasProduct = new InvoiceHasProduct();
            $invoiceHasProduct->hydrate($invoice, $product, $datas);

            $em->persist($invoiceHasProduct);

        }

        $em->flush();
              
        $response = [
            'succes' => true,
            'id' => $invoice->getId()
            ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }


    /**
     * @Route("/{id}", name="invoice_show", methods="GET")
     */
    public function show(Invoice $invoice, ConfiguredSerializer $configuredSerializer)
    {
        $invoice->getCustomer()->delPayments();
        $invoice->getCustomer()->delInvoices();
        
        foreach ($invoice->getPayments() as $payement) {
            $payement->setCustomer($payement->getCustomer()->getId());
        }

        $json = $configuredSerializer->getConfiguredSerializer()->serialize($invoice, 'json');

        return new Response($json);
    }

    /**
     * @Route("/{id}/edit", name="invoice_edit", methods="GET|POST")
     */
    public function edit(Request $request, Invoice $invoice, SerializerInterface $serializer, CompanyRepository $companyRepository, CustomerRepository $customerRepository, StatusRepository $statusRepository, ProductRepository $productRepository, InvoiceHasProductRepository $invoiceHPR): Response
    {
        //edition restriction
        if ($invoice->getStatus() !== 'facture' || $invoice->getStatus() !== 'facture récurrente') {
            $data = $request->getContent();
            $data_array = json_decode($data, true);   
    
            $em = $this->getDoctrine()->getManager();
    
            //take relational object for invoice 
            $customer = $customerRepository->findOneById($data_array['customer']);
            $status = $statusRepository->findOneById($data_array['status']);
            $company = $this->getUser()->getCompany();
            
            $invoice->hydrateEdit($data_array, $customer, $status, $company);
    
            foreach ($invoice->getInvoiceHasProducts() as $iHP) {
                $em->remove($iHP);
            }
            
            //set invoice has product
            foreach ($data_array['invoiceHasProducts'] as $datas) {
                
                $product = $productRepository->findOneById($datas['product']);
    
                    $invoiceHasProduct = new InvoiceHasProduct();
                    $invoiceHasProduct->hydrate($invoice, $product, $datas);
        
                    $em->persist($invoiceHasProduct);
            }
    
            $em->flush();
            $response = [
                'succes' => true,
                'id' => $invoice->getId()
                ];
        }else {
            $response = [
                'succes' => false,
                'id' => $invoice->getId(),
                'error' => 'les factures ou facture récurrente ne peuvent pas etre édité'
                ];
        }

        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("s/{id}", name="invoice_delete", methods="DELETE")
     */ 
    public function delete(Request $request, Invoice $invoice)
    {
        //delete resrtictionjson_decode($data, true);
        if ($invoice->getStatus() !== 'facture' && $invoice->getStatus() !== 'facture récurrente') {

            if ($this->isCsrfTokenValid('delete'.$invoice->getId(), $request->request->get('_token'))) { 
                $em = $this->getDoctrine()->getManager();
                $em->remove($invoice);
                $em->flush();
            }
            $response = [
                'succes' => true,
                ];
        }else {
            $response = [
                'succes' => false,
                'error' => 'les factures ou facture récurrente ne peuvent pas etre supprimés'
                ];
        }
        
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

      /**
     * @Route("/{id}/copy", name="invoice_copy", methods="GET|POST")
     */
    public function copy(Invoice $invoice, SerializerInterface $serializer)
    {
        $em = $this->getDoctrine()->getManager();

        $newInvoice = clone $invoice;

        $company = $this->getUser()->getCompany();

        $payment_term = 'P' . $company->getPaymentTerm() . 'D';
        $date = new \Datetime();
        $reference = $date->format('Ymdh-is');
        $datedeadline = new \Datetime();
        $deadline = $datedeadline->add(new \DateInterval($payment_term));

        $newInvoice->setDate($date);
        $newInvoice->setReference($reference);
        $newInvoice->setDeadline1($deadline);
        $newInvoice->setRecurringDate();
        
        $em->persist($newInvoice);
        $em->flush();
        
        foreach ($invoice->getInvoiceHasProducts() as $ihp) {
            $newIhp = clone $ihp;
            $newIhp->setInvoice($newInvoice);
            $em->persist($newIhp);
        }
        
        $em->flush();

        $response = [
            'succes' => true,
            'id' => $newInvoice->getId()
            ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);

    }

    /**
    * @Route("/{id}/recurring", name="invoice_recurring", methods="GET|POST")
    */
    public function recurring(Request $request, Invoice $invoice, StatusRepository $statusRepo )
    {

        $data = $request->getContent();
        $data_array = json_decode($data, true);
        
        $actualStatus = $invoice->getStatus();
        $statusRec = $statusRepo->findOneByInvoiceStatus('facture récurrente');
        $statusInv = $statusRepo->findOneByInvoiceStatus('facture');

        if ($actualStatus === $statusRec) {

            $invoice->setStatus($statusInv);
            $invoice->setRecurringTerm(null);
            $invoice->setRecurringDate();
            $response = [
                'succes' => true,
                'id' => $invoice->getId()
                ];

        }elseif ($actualStatus === $statusInv) {

            $invoice->setStatus($statusRec);
            $this->setRecurringTerm($data_array['recurringTerm']);
            $this->setRecurringDate();
            $response = [
                'succes' => true,
                'id' => $invoice->getId()
                ];

        }else {
            $response = [
                'succes' => false,
                'id' => $invoice->getId(),
                'error' => 'l objet passé n\'a pas le status facture'
                ];

        }

        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
    * @Route("/{id}/recurred", name="invoice_recurred", methods="GET|POST")
    */
    public function recurred(Invoice $invoice, SerializerInterface $serializer)
    {
        $jsonResponse = $this->copy($invoice, $serializer);
        $jsonContent = $jsonResponse->getContent();
        $response = json_decode($jsonContent, true);

        return $this->redirectToRoute('pdf', [
           'id' => $response['id'], 
        ]);  
    }

    /**
    * @Route("/{id}/abord", name="invoice_abord", methods="GET")
    */
    public function abordInvoiceCreation(Request $request, Invoice $invoice)
    {
        
    }

}
