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
    * @Route("/invoices", name="listlast")
    * @Route("/invoices/create")
    * @Route("/invoices/last")
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
    * @Route("/payment/create/{id}")
    * @Route("/test")
    */
    public function home()
    {
        require('build/index.html');
        exit;
    }

    /**
     * @Route("/api/user")
     */
    public function getConnectedUser(SerializerInterface $serializer)
    {

        if ($this->getUser() === null) {
            $response = [
                'connected' => false,
                ];
        } else {
            $response = [
                'connected' => true,
                'user' => $this->getUser()
                ];
        }

        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }
    /**
     * @Route("/data/logo")
     */
    public function getLogo(Request $request) {
        $data = $request->files->all();
        $get = $request->request->all();
        var_dump($get);
        var_dump($data);
        exit;
    }
}
