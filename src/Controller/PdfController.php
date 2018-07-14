<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use App\Repository\PaymentMethodRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Service\Mailer;

class PdfController extends Controller
{


    /**
     * @Route("/invoice/{id}/pdf", name="pdf")
     */
    public function index(Invoice $invoice, PaymentMethodRepository $pmRepo, Mailer $mailer, \Swift_Mailer $swiftMailer)
    {   

        $phoneIndex = ['DE'=>'+49', 'AT'=>'+43', 'BE'=>'+32', 'BG'=>'+359', 'CY'=>'+357', 'HR'=>'+385', 'DK'=>'+45', 'ESX'=>'+32', 'EE'=>'+372', 'FI'=>'+358', 'FR'=>'+33', 'EL'=>'+30', 'HU'=>'+36', 'IE'=>'+353', 'IT'=>'+39', 'LV'=>'+371', 'LT'=>'+372', 'LU'=>'+352', 'MT'=>'+356', 'NL'=>'+31', 'PL'=>'+48', 'PT'=>'+351', 'CZ'=>'+420', 'RO'=>'+40', 'GB'=>'+44', 'SK'=>'+421', 'SI'=>'+386', 'SE'=>'+46', 'SW'=>'+41'];

        $calendar = ['Jan'=>'janvier', 'Feb'=>'février', 'Mar'=>'mars', 'Apr'=>'avril', 'May'=>'mai', 'Jun'=>'juin', 'Jul'=>'juillet', 'Aug'=>'août', 'Sep'=>'septembre', 'Oct'=>'octobre', 'Nov'=>'novembre', 'Dec'=>'décembre'];


        $paymentMethod = $pmRepo->findAll();

        $html = $this->render('pdf/index.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
            'paymentMethod' => $paymentMethod,
            'phoneIndex' => $phoneIndex,
            'calendar' => $calendar
        ]);

        $this->get('knp_snappy.pdf')->generateFromHtml($html,
                'PDF/facture_' . $invoice->getReference() . '.pdf'
        );

        $message = $this->render('mailer/index.html.twig', [
            'title' => 'Facture'
        ]);
        $urlFilePath = 'PDF/facture_' . $invoice->getReference() . '.pdf';

        $mailer->sendInvoice($message, $urlFilePath, $swiftMailer);

        return $html;
    }
}
