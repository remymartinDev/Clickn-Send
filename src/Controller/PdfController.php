<?php

namespace App\Controller;

use App\Entity\Invoice;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PdfController extends Controller
{
    /**
     * @Route("/invoice/{id}/pdf", name="pdf")
     */
    public function index(Invoice $invoice)
    {
        return $this->render('pdf/index.html.twig', [
            'controller_name' => 'PdfController',
        ]);
    }
}
