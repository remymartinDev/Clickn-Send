<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PaymentRepository")
 */
class Payment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $amount;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\PaymentMethod", inversedBy="payments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $paymentMethode;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="payments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $customer;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Invoice", inversedBy="payments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $invoice;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company")
     * @ORM\JoinColumn(nullable=false)
     */
    private $company;

    public function getId()
    {
        return $this->id;
    }

    public function getDate()
    {
        return $this->date->format('c');
    }

    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    public function getAmount()
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getPaymentMethode()
    {
        return $this->paymentMethode;
    }

    public function setPaymentMethode($paymentMethode)
    {
        $this->paymentMethode = $paymentMethode;

        return $this;
    }

    public function getCustomer()
    {
        return $this->customer;
    }

    public function setCustomer($customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getInvoice()
    {
        return $this->invoice;
    }

    public function setInvoice($invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }
    
    public function hydrate($customer, $company, $paymentMethode, $invoice, $timeStamp)
    {
        $date = new \DateTime($timeStamp);

        $this->setCompany($company);
        $this->setCustomer($customer);
        $this->setInvoice($invoice);
        $this->setPaymentMethode($paymentMethode);
        $this->setDate($date);
    }
}
