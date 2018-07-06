<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Form\InvoiceType;
use App\Repository\InvoiceRepository;
use App\Repository\StatusRepository;
use App\Repository\CompanyRepository;
use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ConfiguredSerializer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;


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
     * @Route("/api/invoices/toctoc", name="toctoc", methods="POST")
     */
    public function toctoc(Request $request, ConfiguredSerializer $serializer)
    {
        $data = $request->getContent();
        $data2 = json_decode($data, true);
        
        $json = $serializer->getConfiguredSerializer()->serialize($data2, 'json');

        return new Response($json);
       // $data = $serializer->deserialize($post, App\Entity\Toctoc::class, 'json');
    }

    /**
     * @Route("/new", name="invoice_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, CustomerRepository $customerRepository, StatusRepository $statusRepository, CompanyRepository $companyRepository): Response
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);
        
        //hydrate an invoice object with data
        $invoice = $serializer->deserialize($data, Invoice::class, 'json');
        
        //take relational object for invoice 
        $customer = $customerRepository->findOneById($data_array['customer']['id']);
        $status = $statusRepository->findOneById($data_array['status']['id']);
        $company = $companyRepository->findOneById($data_array['company']['id']);
        
        //set invoice
        $invoice->setCustomer($customer);
        $invoice->setStatus($status);
        $invoice->setCompany($company);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($invoice);
        $em->flush();
        exit;
    }


    /**
     * @Route("/{id}", name="invoice_show", methods="GET")
     */
    public function show(Invoice $invoice, ConfiguredSerializer $configuredSerializer): Response
    {
        $invoice->getCustomer()->delPayments();
        
        foreach ($invoice->getPayments() as $payement) {
            $payement->setCustomer($payement->getCustomer()->getId());
        }

        $json = $json = $configuredSerializer->getConfiguredSerializer()->serialize($invoice, 'json');

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
     * @Route("/{id}", name="invoice_delete", methods="DELETE")
     */
    public function delete(Request $request, Invoice $invoice): Response
    {
        if ($this->isCsrfTokenValid('delete'.$invoice->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($invoice);
            $em->flush();
        }

        return $this->redirectToRoute('invoice_index');
    }
}
