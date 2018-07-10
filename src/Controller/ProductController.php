<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use App\Repository\CompanyRepository;
use App\Service\ConfiguredSerializer;
use App\Service\InjectionEntity;
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
        $products = $productRepository->findByCompany(1);
        
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($products, 'json');

        return new Response($json);
    }

    /**
     * @Route("/new", name="product_new", methods="GET|POST")
     */
    public function new(Request $request, CompanyRepository $companyRepository, SerializerInterface $serializer, InjectionEntity $injectionEntity): Response
    {
        $data = $request->getContent();
        
        //hydrate an invoice object with data
        $product = $serializer->deserialize($data, Product::class, 'json');
        
        //take relational object for product
        $company = $companyRepository->findOneById(1);
        
        //set product
        $product->setCompany($company);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($product);
        $em->flush();

        $succes = true;
        $json = $serializer->serialize($succes, 'json');
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
    public function edit(Request $request, Product $product, SerializerInterface $serializer, CompanyRepository $companyRepository): Response
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);

        //set product
        $product->hydrate($data_array);
        
        $this->getDoctrine()->getManager()->flush();
        
        $succes = true;
        $json = $serializer->serialize($succes, 'json');
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

       $succes = true;
       $json = $serializer->serialize($succes, 'json');
       return new Response($json);
    }
}
