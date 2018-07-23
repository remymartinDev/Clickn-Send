<?php

namespace App\Controller;

use App\Entity\Payment;
use App\Entity\Invoice;
use App\Form\PaymentType;
use App\Repository\CompanyRepository;
use App\Repository\PaymentRepository;
use App\Service\ConfiguredSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\PaymentMethodRepository;


/**
 * @Route("/api/payment")
 */
class PaymentController extends Controller
{

    /**
     * @Route("s/{id}", name="payment_list", methods="GET")
     */
    public function list(Invoice $invoice, PaymentRepository $paymentRepository, ConfiguredSerializer $configuredSerializer)
    {
        $companyId = $this->getUser()->getCompany()->getId();
        $invoiceCompanyId = $invoice->getCompany()->getId();

        if ($companyId === $invoiceCompanyId) {
            
            $payments = $paymentRepository->findByInvoice($invoice);
    
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

        }else {

            $response = [
                'succes' => false,
            ];
            $json = $serializer->serialize($response, 'json');

        }
        
        return new Response($json);
    }


    /**
     * @Route("/new/{id}", name="payment_new", methods="GET|POST")
     */ 
    public function new(Request $request, Invoice $invoice, SerializerInterface $serializer, PaymentMethodRepository $paymentMethodRepo, PaymentRepository $paymentRepo)
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);
        
        //hydrate an invoice object with data
        $payment = $serializer->deserialize($data, Payment::class, 'json');
        
        //take relational object for product
        $customer = $invoice->getCustomer();
        $company = $this->getUser()->getCompany();

        //take json datas
        $timeStamp = $data_array['date'];
        $paymentMethod = $paymentMethodRepo->findOneById($data_array['paymentMethod']);

        $payment->hydrate($customer, $company, $paymentMethod, $invoice, $timeStamp);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($payment);
        $em->flush();

        $invoice->checkPayment();
        $em->flush();

        $response = [
            'succes' => true,
            'invoicePaid' => $invoice->getPaid()
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("/{id}/edit", name="payment_edit", methods="POST")
     */
    public function edit(Request $request, Payment $payment)
    {
        $data = $request->getContent();
        $data_array = json_decode($data, true);

        //take json datas
        $timeStamp = $data_array['date'];
        $paymentMethod = $paymentMethodRepo->findOneById($data_array['paymentMethod']);

        $payment->setDate($timeStamp);
        $payment->setPaymentMethode($paymentMethod);
        $payment->setAmount($data_array['amount']);
        
        $em = $this->getDoctrine()->getManager();
        $em->flush();
        
        $invoice->checkPayment();
        $em->flush();

        $response = [
            'succes' => true,
            'id' => $payment->getId(),
            'invoicePaid' => $invoice->getPaid()
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);
    }

    /**
     * @Route("/{id}", name="payment_delete", methods="DELETE")
     */
    public function delete(Request $request, Payment $payment): Response
    {

        $em = $this->getDoctrine()->getManager();
        $em->remove($payment);
        $em->flush();

        $response = [
        'succes' => true,
        ];
        $json = $serializer->serialize($response, 'json');
        return new Response($json);

    }
}
