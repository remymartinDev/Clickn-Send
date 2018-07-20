<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\StatusRepository;
use App\Repository\InvoiceRepository;
use App\Repository\PaymentMethodRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Service\Mailer;
use Symfony\Component\DependencyInjection\Tests\Compiler\PrivateConstructor;
use Symfony\Component\HttpFoundation\Response;

class PdfController extends Controller
{

    private $phoneIndex = ['DE'=>'+49', 'AT'=>'+43', 'BE'=>'+32', 'BG'=>'+359', 'CY'=>'+357', 'HR'=>'+385', 'DK'=>'+45', 'ESX'=>'+32', 'EE'=>'+372', 'FI'=>'+358', 'FR'=>'+33', 'EL'=>'+30', 'HU'=>'+36', 'IE'=>'+353', 'IT'=>'+39', 'LV'=>'+371', 'LT'=>'+372', 'LU'=>'+352', 'MT'=>'+356', 'NL'=>'+31', 'PL'=>'+48', 'PT'=>'+351', 'CZ'=>'+420', 'RO'=>'+40', 'GB'=>'+44', 'SK'=>'+421', 'SI'=>'+386', 'SE'=>'+46', 'SW'=>'+41'];

    private $calendar = ['Jan'=>'janvier', 'Feb'=>'février', 'Mar'=>'mars', 'Apr'=>'avril', 'May'=>'mai', 'Jun'=>'juin', 'Jul'=>'juillet', 'Aug'=>'août', 'Sep'=>'septembre', 'Oct'=>'octobre', 'Nov'=>'novembre', 'Dec'=>'décembre'];

    /**
     * @Route("/invoice/{id}/pdfFactory", name="pdf_factory")
     */
    public function pdfFactory(Invoice $invoice, PaymentMethodRepository $pmRepo, Mailer $mailer, \Swift_Mailer $swiftMailer, StatusRepository $statusRepository)
    {   

        $phoneIndex = $this->phoneIndex;
        $calendar = $this->calendar;

        $paymentMethod = $pmRepo->findAll();
      
        $actualStatus = $invoice->getStatus();
        $statusRec = $statusRepository->findOneByInvoiceStatus('facture récurrente');
        $statusInv = $statusRepository->findOneByInvoiceStatus('facture');
        $statusBrou = $statusRepository->findOneByInvoiceStatus('brouillon');

        if ($actualStatus === $statusBrou) {
            if ($invoice->getRecurringTerm() === null || $invoice->getRecurringTerm() === 0) {
                $invoice->setStatus($statusInv);
            } else {
                $invoice->setStatus($statusRec);
            }
        }

<<<<<<< HEAD
        $html = $this->render('pdf/factory.html.twig', [
=======
        $this->getDoctrine()->getManager()->flush();

        $html = $this->renderView('pdf/factory.html.twig', [
>>>>>>> refs/remotes/origin/V3
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
        $userMail = $this->getUser()->getCompany()->getEmail();

        $destinataire = [$clienMail, $userMail];

        $mailer->sendInvoice($message, $urlFilePath, $swiftMailer, $destinataire);
        //return $this->redirectToRoute('home');
        return $html;
    }


     /**
     * @Route("/invoice/{id}/pdfShow", name="pdf_show")
     */
    public function pdfShow(Invoice $invoice, PaymentMethodRepository $pmRepo)
    {   

        $phoneIndex = $this->phoneIndex;
        $calendar = $this->calendar;


        $paymentMethod = $pmRepo->findAll();


        return $this->render('pdf/show.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
            'paymentMethod' => $paymentMethod,
            'phoneIndex' => $phoneIndex,
            'calendar' => $calendar
        ]);
    }

    /**
    * @Route("/invoice/{id}/pdfdownload", name="pdf_dl")
    */
    public function pdfDownload(Invoice $invoice, PaymentMethodRepository $pmRepo)
    {
        $phoneIndex = $this->phoneIndex;
        $calendar = $this->calendar;


        $paymentMethod = $pmRepo->findAll();


        $html = $this->renderView('pdf/factory.html.twig', [
            'title' => 'Facture PDF',
            'invoice' => $invoice,
            'paymentMethod' => $paymentMethod,
            'phoneIndex' => $phoneIndex,
            'calendar' => $calendar
        ]);

        return new Response(
        $this->get('knp_snappy.pdf')->getOutputFromHtml($html), 200,
        array(
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="facture-' . $invoice->getReference() . '.pdf"'
        )
    );
    }
}
