<?php

namespace App\Controller;

use App\Entity\InvoiceHasProduct;
use App\Form\InvoiceHasProductType;
use App\Repository\InvoiceHasProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/invoice/has/product")
 */
class InvoiceHasProductController extends Controller
{
    /**
     * @Route("/", name="invoice_has_product_index", methods="GET")
     */
    public function index(InvoiceHasProductRepository $invoiceHasProductRepository): Response
    {
        return $this->render('invoice_has_product/index.html.twig', ['invoice_has_products' => $invoiceHasProductRepository->findAll()]);
    }

    /**
     * @Route("/new", name="invoice_has_product_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $invoiceHasProduct = new InvoiceHasProduct();
        $form = $this->createForm(InvoiceHasProductType::class, $invoiceHasProduct);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($invoiceHasProduct);
            $em->flush();

            return $this->redirectToRoute('invoice_has_product_index');
        }

        return $this->render('invoice_has_product/new.html.twig', [
            'invoice_has_product' => $invoiceHasProduct,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="invoice_has_product_show", methods="GET")
     */
    public function show(InvoiceHasProduct $invoiceHasProduct): Response
    {
        return $this->render('invoice_has_product/show.html.twig', ['invoice_has_product' => $invoiceHasProduct]);
    }

    /**
     * @Route("/{id}/edit", name="invoice_has_product_edit", methods="GET|POST")
     */
    public function edit(Request $request, InvoiceHasProduct $invoiceHasProduct): Response
    {
        $form = $this->createForm(InvoiceHasProductType::class, $invoiceHasProduct);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('invoice_has_product_edit', ['id' => $invoiceHasProduct->getId()]);
        }

        return $this->render('invoice_has_product/edit.html.twig', [
            'invoice_has_product' => $invoiceHasProduct,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="invoice_has_product_delete", methods="DELETE")
     */
    public function delete(Request $request, InvoiceHasProduct $invoiceHasProduct): Response
    {
        if ($this->isCsrfTokenValid('delete'.$invoiceHasProduct->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($invoiceHasProduct);
            $em->flush();
        }

        return $this->redirectToRoute('invoice_has_product_index');
    }
}
