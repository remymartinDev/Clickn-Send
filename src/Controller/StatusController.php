<?php

namespace App\Controller;

use App\Entity\Status;
use App\Form\StatusType;
use App\Repository\StatusRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ConfiguredSerializer;

/**
 * @Route("api/statu")
 */
class StatusController extends Controller
{
    /**
     * @Route("s", name="status_index", methods="GET")
     */
    public function list(StatusRepository $statusRepository,ConfiguredSerializer $configuredSerializer)
    {
        $status = $statusRepository->findAll();

        $json = $configuredSerializer->getConfiguredSerializer()->serialize($status, 'json');

        return new Response($json);
    }

}
