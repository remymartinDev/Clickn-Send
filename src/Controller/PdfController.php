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
     * @Route("/invoice/{id}/pdfFactory", name="pdf_factory")
     */
    public function pdfFactory(Invoice $invoice, PaymentMethodRepository $pmRepo, Mailer $mailer, \Swift_Mailer $swiftMailer)
    {   

        $phoneIndex = ['DE'=>'+49', 'AT'=>'+43', 'BE'=>'+32', 'BG'=>'+359', 'CY'=>'+357', 'HR'=>'+385', 'DK'=>'+45', 'ESX'=>'+32', 'EE'=>'+372', 'FI'=>'+358', 'FR'=>'+33', 'EL'=>'+30', 'HU'=>'+36', 'IE'=>'+353', 'IT'=>'+39', 'LV'=>'+371', 'LT'=>'+372', 'LU'=>'+352', 'MT'=>'+356', 'NL'=>'+31', 'PL'=>'+48', 'PT'=>'+351', 'CZ'=>'+420', 'RO'=>'+40', 'GB'=>'+44', 'SK'=>'+421', 'SI'=>'+386', 'SE'=>'+46', 'SW'=>'+41'];

        $calendar = ['Jan'=>'janvier', 'Feb'=>'février', 'Mar'=>'mars', 'Apr'=>'avril', 'May'=>'mai', 'Jun'=>'juin', 'Jul'=>'juillet', 'Aug'=>'août', 'Sep'=>'septembre', 'Oct'=>'octobre', 'Nov'=>'novembre', 'Dec'=>'décembre'];


        $paymentMethod = $pmRepo->findAll();


        $html = $this->render('pdf/factory.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
            'paymentMethod' => $paymentMethod,
            'phoneIndex' => $phoneIndex,
            'calendar' => $calendar
        ]);

        //eraze the elder invoice
        if (file_exists('PDF/facture.pdf')) {
            unlink('PDF/facture.pdf');
        }

        //create new invoice
        $this->get('knp_snappy.pdf')->generateFromHtml($html,
                'PDF/facture.pdf'
        );

        //set the mail message
        $message = $this->renderView('mailer/index.html.twig', [
            'title' => 'Facture',
            'invoice' => $invoice
        ]);

        $urlFilePath = 'PDF/facture.pdf';
        $clienMail = $invoice->getCustomer()->getEmail();

        $mailer->sendInvoice($message, $urlFilePath, $swiftMailer, $clienMail);

        return $html;
    }

     /**
     * @Route("/invoice/{id}/pdfShow", name="pdf_show")
     */
    public function pdfShow(Invoice $invoice, PaymentMethodRepository $pmRepo, Mailer $mailer, \Swift_Mailer $swiftMailer)
    {   

        $phoneIndex = ['DE'=>'+49', 'AT'=>'+43', 'BE'=>'+32', 'BG'=>'+359', 'CY'=>'+357', 'HR'=>'+385', 'DK'=>'+45', 'ESX'=>'+32', 'EE'=>'+372', 'FI'=>'+358', 'FR'=>'+33', 'EL'=>'+30', 'HU'=>'+36', 'IE'=>'+353', 'IT'=>'+39', 'LV'=>'+371', 'LT'=>'+372', 'LU'=>'+352', 'MT'=>'+356', 'NL'=>'+31', 'PL'=>'+48', 'PT'=>'+351', 'CZ'=>'+420', 'RO'=>'+40', 'GB'=>'+44', 'SK'=>'+421', 'SI'=>'+386', 'SE'=>'+46', 'SW'=>'+41'];

        $calendar = ['Jan'=>'janvier', 'Feb'=>'février', 'Mar'=>'mars', 'Apr'=>'avril', 'May'=>'mai', 'Jun'=>'juin', 'Jul'=>'juillet', 'Aug'=>'août', 'Sep'=>'septembre', 'Oct'=>'octobre', 'Nov'=>'novembre', 'Dec'=>'décembre'];


        $paymentMethod = $pmRepo->findAll();


        return $this->render('pdf/show.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
            'paymentMethod' => $paymentMethod,
            'phoneIndex' => $phoneIndex,
            'calendar' => $calendar
        ]);
    }
}
