<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Form\InvoiceType;
use App\Repository\InvoiceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Service\ConfiguredSerializer;
/**
 * @Route("/api/invoice")
 */
class InvoiceController extends Controller
{
    
    /**
     * @Route("s", name="invoice_index", methods="GET")
     */
    public function all(InvoiceRepository $invoiceRepository, ConfiguredSerializer $configuredSerializer)
    {
<<<<<<< HEAD
        $invoices = $invoiceRepository->findAllInvoicesByCompany(1);
=======
        $invoices = $invoiceRepository->findAllInvoicesByCompany(3);
>>>>>>> refs/remotes/origin/V1
        
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($invoices, 'json');

        return new Response($json);
    }

    /**php bin/console doctrine:fixtures:load
     * php bin/console doctrine:fixtures:load
     */
    public function new(Request $request): Response
    {
        $invoice = new Invoice();
        $form = $this->createForm(InvoiceType::class, $invoice);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($invoice);
            $em->flush();

            return $this->redirectToRoute('invoice_index');
        }

        return $this->render('invoice/new.html.twig', [
            'invoice' => $invoice,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="invoice_show", methods="GET")
     */
    public function show(Invoice $invoice, ConfiguredSerializer $configuredSerializer): Response
    {
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
