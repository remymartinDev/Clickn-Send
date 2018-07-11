<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PdfController extends Controller
{
    /**
     * @Route("/invoice/{id}/pdf", name="pdf")
     */
    public function index(Invoice $invoice, InvoiceRepository $invoiceRepo)
    {
        $this->get('knp_snappy.pdf')->generateFromHtml(
            $this->renderView(
                'pdf/index.html.twig',
                array(
                    'controller_name' => 'PdfController',
                    'title' => 'Facture PDF',
                )
                ),
                'PDF/facture'. $invoice->getId() .'.pdf'
        );

        $invoices = $invoiceRepo->findForPdf($invoice); 
        dump($invoices);

        return $this->render('pdf/index.html.twig', [
            'title' => 'Facture PDF',
            'invoices' => $invoices,
        ]);
    }
}
