<?php
namespace App\Service;

class Mailer
{

    public function sendInvoice($html, $urlFilePath, $mailer, $destinataire)
    {
        foreach ($destinataire as $email) {
            $message = (new \Swift_Message('Facture'))
            ->setFrom('clicknsend2018@gmail.com')
            ->setTo($email)
            ->setBody($html, 'text/html')
            ->attach(\Swift_Attachment::fromPath($urlFilePath));
    
            $mailer->send($message);
        }

        return true;
    }
    
}
