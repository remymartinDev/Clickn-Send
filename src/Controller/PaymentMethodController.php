<?php

namespace App\Controller;

use App\Entity\PaymentMethod;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\PaymentMethodRepository;
use App\Service\ConfiguredSerializer;

class PaymentMethodController extends Controller
{
    /**
     * @Route("api/payment/methods", name="payment_methods_index", methode="GET")
     */
    public function list(PaymentMethodRepository $paymentMethodRepo, ConfiguredSerializer $configuredSerializer)
    {
        $method = $paymentMethodRepo->findAll();

        $json = $configuredSerializer->getConfiguredSerializer()->serialize($method, 'json');

        return new Response($json);
    }
}
