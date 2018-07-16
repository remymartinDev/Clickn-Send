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
    * @Route("/", name="home")
    * @Route("/dashboard")
    * @Route("/invoices")
    * @Route("/invoices/create")
    * @Route("/invoices/{id}")
    * @Route("/invoices/{id}/edit")
    * @Route("/products")
    * @Route("/admin/products")
    * @Route("/products/create")
    * @Route("/products/{id}")
    * @Route("/products/{id}/edit")
    * @Route("/customers")
    * @Route("/admin/customers")
    * @Route("/customers/create")
    * @Route("/customers/{id}")
    * @Route("/customers/{id}/edit")
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
    * @Route("/test")
    * @Route("/login")
    * @Route("/signin")
    */
    public function home()
    {
        require('build/index.html');
        exit;
    }
}
