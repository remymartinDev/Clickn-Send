<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MainController extends Controller
{
    /**
    * @Route("/")
    * @Route("/dashboard")
    * @Route("/invoices")
    * @Route("/invoice/create")
    * @Route("/invoice/{id}")
    * @Route("/invoice/{id}/edit")
    * @Route("/products")
    * @Route("/admin/products")
    * @Route("/product/create")
    * @Route("/product/{id}")
    * @Route("/products/{id}/edit")
    * @Route("/customers")
    * @Route("/admin/customers")
    * @Route("/customer/create")
    * @Route("/customer/{id}")
    * @Route("/customer/{id}/edit")
    * @Route("/admin/members")
    * @Route("/admin/member/create")
    * @Route("/admin/member/{id}")
    * @Route("/admin/member/{id}/edit")
    * @Route("/admin/company")
    * @Route("/admin/company/edit")
    * @Route("/company/create")
    * @Route("/payments")
    * @Route("/admin/payment/edit")
    * @Route("/payment/create")
    */
    public function home()
    {
        require('build/index.html');
        exit;
    }
}
