<?php
namespace App\Service;

class Mailer
{

    public function sendInvoice($html, $urlFilePath, $mailer, $clientMail)
    {
        $message = (new \Swift_Message('Facture'))
        ->setFrom('clicknsend2018@gmail.com')
        ->setTo($clientMail)
        ->setBody($html, 'text/html')
        ->attach(\Swift_Attachment::fromPath($urlFilePath));

        $mailer->send($message);
        return true;
    }
    
}
