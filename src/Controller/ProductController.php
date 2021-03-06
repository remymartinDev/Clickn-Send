<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use App\Repository\CompanyRepository;
use App\Service\ConfiguredSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * @Route("/api/product")
 */
class ProductController extends Controller
{
    /**
     * @Route("s", name="product_list", methods="GET")
     */
    public function list(ProductRepository $productRepository, ConfiguredSerializer $configuredSerializer): Response
    {
        $companyId = $this->getUser()->getCompany()->getId();

        if ($this->getUser()->getRoles()[0] === 'ROLE_ADMIN') {
            $products = $productRepository->findByCompany($companyId);
        }else {
            $products = $productRepository->findActivProducts($companyId);
        }
        
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($products, 'json');

        return new Response($json);
    }

    /**
     * @Route("/new", name="product_new", methods="GET|POST")
     */
    public function new(Request $request, CompanyRepository $companyRepository, SerializerInterface $serializer): Response
    {
        $data = $request->getContent();
        
        //hydrate an invoice object with data
        $product = $serializer->deserialize($data, Product::class, 'json');
        
        //take relational object for product
        $company = $this->getUser()->getCompany();
        
        //set product
        $product->setCompany($company);
        $product->setActive(true);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($product);
        $em->flush();

        $response = [
            'succes' => true,
            'id' => $product->getId()
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }


    /**
     * @Route("/{id}", name="product_show", methods="GET")
     */
    public function show(Product $product ,ConfiguredSerializer $configuredSerializer): Response
    {
        $json = $json = $configuredSerializer->getConfiguredSerializer()->serialize($product, 'json');

        return new Response($json);
    }

    /**
     * @Route("/{id}/edit", name="product_edit", methods="GET|POST")
     */
    public function edit(Request $request, Product $product, SerializerInterface $serializer): Response
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);

        //set product
        $product->hydrate($data_array);
        
        $this->getDoctrine()->getManager()->flush();
        
        $response = [
            'succes' => true,
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("/{id}", name="product_delete", methods="DELETE")
     */
    public function delete(Request $request, Product $product, SerializerInterface $serializer): Response
    {
       /*  if ($this->isCsrfTokenValid('delete'.$product->getId(), $request->request->get('_token'))) { */
            $em = $this->getDoctrine()->getManager();
            $em->remove($product);
            $em->flush();
       /*  } */

       $response = [
        'succes' => true,
    ];
    $json = $serializer->serialize($response, 'json');
    return new Response($json);
    }

    /**
     * @Route("/{id}/activ", name="product_activ", methods="GET|POST")
     */
    public function activ(Request $request, Product $product, SerializerInterface $serializer): Response
    {
        if ($product->getActive()) {
            $product->setActive(false);
        }else{
            $product->setActive(true);
        }
        
        $this->getDoctrine()->getManager()->flush();
        
        $response = [
            'succes' => true,
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    
}
