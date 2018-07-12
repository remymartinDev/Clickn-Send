<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use App\Repository\PaymentMethodRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PdfController extends Controller
{


    /**
     * @Route("/invoice/{id}/pdf", name="pdf")
     */
    public function index(Invoice $invoice, PaymentMethodRepository $pmRepo)
    {   
        $paymentMethod = $pmRepo->findAll();

        $html = $this->render('pdf/index.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
            'paymentMethod' => $paymentMethod
        ]);

/*         $this->get('knp_snappy.pdf')->generateFromHtml($html,
                'PDF/facture.pdf'
        ); */

        return $html;
    }
}
