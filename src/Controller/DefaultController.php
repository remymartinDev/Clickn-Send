<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/data", name="data")
     */
    public function data()
    {
       return new JsonResponse([
           "data1" => "lapin",
           "data2" => "poulet"
       ]);
    }

    /**
     * @Route("/{slug}", name="home", requirements={"slug"=".*"})
     */
    public function index()
    {
        // parceque je n'aime pas utiliser un bundle (twig) pour ne l'utiliser qu'une seul fois (ici).
        require('build/index.html');
        exit;
    }

}
