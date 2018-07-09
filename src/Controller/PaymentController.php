<?php

namespace App\Controller;

use App\Entity\Payment;
use App\Entity\Invoice;
use App\Form\PaymentType;
use App\Repository\CompanyRepository;
use App\Repository\PaymentRepository;
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
 * @Route("/api/payment")
 */
class PaymentController extends Controller
{

    /**
     * @Route("s", name="payment_list", methods="GET")
     */
    public function index(PaymentRepository $paymentRepository, ConfiguredSerializer $configuredSerializer)
    {
        $payments = $paymentRepository->findByCompany(1);

        foreach ($payments as $payment) {

            $customer = $payment->getCustomer();
            
            $customer->delPayments();
            $customer->delInvoices();
            $customer->setCompany(null);

            $invoice = $payment->getInvoice();                        

            $invoice->delPayments();
            $invoice->delInvoiceHasProduct();
            $invoice->setCompany(null);
            $invoice->setCustomer(null);
        }
        
        //on utilise un service créé par nos soin pour configurer le serializer
        $json = $configuredSerializer->getConfiguredSerializer()->serialize($payments, 'json');

        return new Response($json);
    }


    /**
     * @Route("/new/{id}", name="payment_new", methods="GET|POST")
     */ 
    public function new(Request $request, Invoice $invoice, CompanyRepository $companyRepository, SerializerInterface $serializer, InjectionEntity $injectionEntity)
    {
        $data = $request->getContent();
        
        //hydrate an invoice object with data
        $payment = $serializer->deserialize($data, Payment::class, 'json');
        
        //take relational object for product
        $customer = $invoice->getCustomer();
        $company = $companyRepository->findOneById(1);
        
        //set product
        $customer->setCompany($company);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($customer);
        $em->flush();

        return new Response('true');
    }

    /**
     * @Route("/{id}/edit", name="payment_edit", methods="GET|POST")
     */
    public function edit(Request $request, Payment $payment): Response
    {
        $form = $this->createForm(PaymentType::class, $payment);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('payment_edit', ['id' => $payment->getId()]);
        }

        return $this->render('payment/edit.html.twig', [
            'payment' => $payment,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="payment_delete", methods="DELETE")
     */
    public function delete(Request $request, Payment $payment): Response
    {
        /* if ($this->isCsrfTokenValid('delete'.$payment->getId(), $request->request->get('_token'))) { */
            $em = $this->getDoctrine()->getManager();
            $em->remove($payment);
            $em->flush();
       /*  } */

       return new Response('true');
    }
}
