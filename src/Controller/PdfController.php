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
    public function index(Invoice $invoice)
    {
        $this->get('knp_snappy.pdf')->generateFromHtml(
            $this->render(
                'pdf/index.html.twig',
                array(
                    'title' => 'Facture PDF',
                    'invoice' => $invoice,
                )
                ),
                'PDF/facture'. $invoice->getId() .'.pdf'
        );

/*         return $this->render('pdf/index.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
        ]); */
    }
}
