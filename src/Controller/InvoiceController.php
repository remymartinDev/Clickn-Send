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
        $invoices = $invoiceRepository->findByCompany(1);

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
        $company = $companyRepository->findOneById(1);
        
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
    public function edit(Request $request, Invoice $invoice): Response
    {
        $form = $this->createForm(InvoiceType::class, $invoice);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('invoice_edit', ['id' => $invoice->getId()]);
        }

        return $this->render('invoice/edit.html.twig', [
            'invoice' => $invoice,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("s/{id}", name="invoice_delete", methods="DELETE")
     */ 
    public function delete(Request $request, Invoice $invoice)
    {

/*         if ($this->isCsrfTokenValid('delete'.$invoice->getId(), $request->request->get('_token'))) { */
            $em = $this->getDoctrine()->getManager();
            $em->remove($invoice);
            $em->flush();
        
       /*  } */
       $response = [
        'succes' => true,
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

}
