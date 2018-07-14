<?php
namespace App\Service;

class Mailer
{

    public function sendInvoice($html, $urlFilePath, $mailer)
    {
        $message = (new \Swift_Message('Hello Email'))
        ->setFrom('clicknsend2018@gmail.com')
        ->setTo('juriens.rodrigue@gmail.com')
        ->setBody($html)
        ->attach(\Swift_Attachment::fromPath($urlFilePath));

        $mailer->send($message);
        return true;
    }
    
}
