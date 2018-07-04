<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ZmainController extends Controller
{
    /**
     * @Route("/{slug}", name="zome", requirements={"slug"=".*"})
     */
    public function zome()
    {
        require('build/index.html');
        exit;
    }
}
