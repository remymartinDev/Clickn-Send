<?php

namespace App\Controller;

use App\Entity\Role;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use App\Service\ConfiguredSerializer;
use App\Repository\RoleRepository;

/**
 * @Route("/api/role")
 */
class RoleController extends Controller 
{
    /**
     * @Route("s", name="roles", methods="GET")
     */
    public function list(Request $request, RoleRepository $roleRepository)
    {
        $roles = $roleRepository->findAll();
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($roles, 'json');

        return new Response($json);
    }
}