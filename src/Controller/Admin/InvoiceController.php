<?php

namespace App\Controller\Admin;

use App\Entity\Invoice;
use App\Form\InvoiceType;
use App\Repository\InvoiceRepository;
use App\Repository\StatusRepository;
use App\Repository\CustomerRepository;
use App\Repository\CompanyRepository;
use App\Service\ConfiguredSerializer;
use App\Service\InjectionEntity;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\InvoiceHasProduct;
use App\Repository\ProductRepository;
use App\Repository\InvoiceHasProductRepository;


/**
 * @Route("/api/admin/invoice")
 */
class InvoiceController extends Controller
{
    
    /**
     * @Route("/{id}/edit", name="invoice_edit_admin", methods="GET|POST")
     */
    public function edit(Request $request, Invoice $invoice, SerializerInterface $serializer, StatusRepository $statusRepository): Response
    {
        $role = $this->getUser()->getRoles();

        if ($role[0] === 'ROLE_ADMIN') {

            $data = $request->getContent();
            $data_array = json_decode($data, true);   

            $em = $this->getDoctrine()->getManager();
            $status = $statusRepository->findOneByInvoiceStatus($data_array['status']);

            $invoice->setStatus($status);

            $em->flush();
            $response = [
                'succes' => true,
                'id' => $invoice->getId()
                ];
        } else {
            $response = [
                'succes' => false,
                'id' => $invoice->getId()
                ];
        }

        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

}
