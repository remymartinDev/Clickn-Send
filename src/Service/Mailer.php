<?php
namespace App\Service;

class Mailer
{

    public function sendInvoice($html, $urlFilePath, $mailer)
    {
        $message = (new \Swift_Message('Facture'))
        ->setFrom('clicknsend2018@gmail.com')
        ->setTo('virginie.gruber@gmail.com')
        ->setBody($html, 'text/html')
        ->attach(\Swift_Attachment::fromPath($urlFilePath));

        $mailer->send($message);
        return true;
    }
    
}
