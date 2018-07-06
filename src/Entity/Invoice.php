<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 */
class Invoice
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
     * @ORM\Column(type="string", length=25)
     */
    private $reference;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $amount_all_taxes;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $amount_dutty_free;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $taxes_amount;

    /**
     * @ORM\Column(type="boolean")
     */
    private $paid;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2, nullable=true)
     */
    private $down_payment;

    /**
     * @ORM\Column(type="smallint")
     */
    private $reminder;

    /**
     * @ORM\Column(type="date")
     */
    private $deadline1;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $deadline2;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $comment;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     */
    private $customer;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Status", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Payment", mappedBy="invoice")
     */
    private $payments;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\InvoiceHasProduct", mappedBy="invoice")
     */
    private $invoiceHasProducts;

    public function __construct()
    {
        $this->payments = new ArrayCollection();
        $this->invoiceHasProducts = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getDate()
    {
        return $this->date->format('c');
    }

    public function setDate(): self
    {
        $this->date = new \Datetime();
        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getAmountAllTaxes()
    {
        return $this->amount_all_taxes;
    }

    public function setAmountAllTaxes($amount_all_taxes): self
    {
        $this->amount_all_taxes = $amount_all_taxes;

        return $this;
    }

    public function getAmountDuttyFree()
    {
        return $this->amount_dutty_free;
    }

    public function setAmountDuttyFree($amount_dutty_free): self
    {
        $this->amount_dutty_free = $amount_dutty_free;

        return $this;
    }

    public function getTaxesAmount()
    {
        return $this->taxes_amount;
    }

    public function setTaxesAmount($taxes_amount): self
    {
        $this->taxes_amount = $taxes_amount;

        return $this;
    }

    public function getPaid(): ?bool
    {
        return $this->paid;
    }

    public function setPaid(bool $paid): self
    {
        $this->paid = $paid;

        return $this;
    }

    public function getDownPayment()
    {
        return $this->down_payment;
    }

    public function setDownPayment($down_payment): self
    {
        $this->down_payment = $down_payment;

        return $this;
    }

    public function getReminder(): ?int
    {
        return $this->reminder;
    }

    public function setReminder(int $reminder): self
    {
        $this->reminder = $reminder;

        return $this;
    }

    public function getDeadline1()
    {
        return $this->deadline1->format('c');
    }

    public function setDeadline1(): self
    {
        $this->deadline1 = new \Datetime();

        return $this;
    }

    public function getDeadline2()
    {
        if (isset($deadline2)) {
            return $this->deadline2->format('c');
        }
    }

    public function setDeadline2(): self
    {
        $this->deadline2 = new \Datetime();

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

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

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCompany()
    {
        return $this->company;
    }

    public function setCompany($company)
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|Payment[]
     */
    public function getPayments()
    {
        return $this->payments;
    }

    public function addPayment(Payment $payment): self
    {
        if (!$this->payments->contains($payment)) {
            $this->payments[] = $payment;
            $payment->setInvoice($this);
        }

        return $this;
    }

    public function removePayment(Payment $payment): self
    {
        if ($this->payments->contains($payment)) {
            $this->payments->removeElement($payment);
            // set the owning side to null (unless already changed)
            if ($payment->getInvoice() === $this) {
                $payment->setInvoice(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|InvoiceHasProduct[]
     */
    public function getInvoiceHasProducts()
    {
        return $this->invoiceHasProducts;
    }

    public function addInvoiceHasProduct(InvoiceHasProduct $invoiceHasProduct): self
    {
        if (!$this->invoiceHasProducts->contains($invoiceHasProduct)) {
            $this->invoiceHasProducts[] = $invoiceHasProduct;
            $invoiceHasProduct->setInvoice($this);
        }

        return $this;
    }

    public function removeInvoiceHasProduct(InvoiceHasProduct $invoiceHasProduct): self
    {
        if ($this->invoiceHasProducts->contains($invoiceHasProduct)) {
            $this->invoiceHasProducts->removeElement($invoiceHasProduct);
            // set the owning side to null (unless already changed)
            if ($invoiceHasProduct->getInvoice() === $this) {
                $invoiceHasProduct->setInvoice(null);
            }
        }

        return $this;
    }

    public function delInvoiceHasProduct()
    {
        $this->invoiceHasProducts = [];
    }

    public function delPayments()
    {
        $this->payments = [];
    }

}
