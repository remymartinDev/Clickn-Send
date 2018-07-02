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

    public function getId()
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
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

    public function getPaymentMethode(): ?PaymentMethod
    {
        return $this->paymentMethode;
    }

    public function setPaymentMethode(?PaymentMethod $paymentMethode): self
    {
        $this->paymentMethode = $paymentMethode;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice(?Invoice $invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }
}
