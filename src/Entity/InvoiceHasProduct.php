<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceHasProductRepository")
 */
class InvoiceHasProduct
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $quantity;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Invoice", inversedBy="invoiceHasProducts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $invoice;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="invoiceHasProducts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product;

    /**
     * @ORM\Column(type="decimal", precision=4, scale=2, nullable=true)
     */
    private $vatRate;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $remiseType;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2, nullable=true)
     */
    private $amountProductRemise;

    /**
     * @ORM\Column(type="decimal", precision=4, scale=2, nullable=true)
     */
    private $remise;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $amountDuttyFree;

    public function getId()
    {
        return $this->id;
    }

    public function getQuantity()
    {
        return $this->quantity;
    }

    public function setQuantity($quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice($invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct($product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getVatRate()
    {
        return $this->vatRate;
    }

    public function setVatRate($vatRate): self
    {
        $this->vatRate = $vatRate;

        return $this;
    }

    public function hydrate($invoice, $product, $datas)
    {
        $this->setInvoice($invoice);
        $this->setQuantity($datas['quantity']);
        $this->setProduct($product);
        $this->setRemise($datas['remise']);
        $this->setVatRate($datas['vatRate']);
        $this->setAmountDuttyFree($datas['amountDuttyFree']);
        $this->setAmountProductRemise($datas['amountProductRemise']);
        $this->setRemiseType($datas['remiseType']);

    }

    public function getRemiseType(): ?string
    {
        return $this->remiseType;
    }

    public function setRemiseType(?string $remiseType): self
    {
        $this->remiseType = $remiseType;

        return $this;
    }

    public function getAmountProductRemise()
    {
        return $this->amountProductRemise;
    }

    public function setAmountProductRemise($amountProductRemise): self
    {
        $this->amountProductRemise = $amountProductRemise;

        return $this;
    }

    public function getRemise()
    {
        return $this->remise;
    }

    public function setRemise($remise): self
    {
        $this->remise = $remise;

        return $this;
    }

    public function getAmountDuttyFree()
    {
        return $this->amountDuttyFree;
    }

    public function setAmountDuttyFree($amountDuttyFree): self
    {
        $this->amountDuttyFree = $amountDuttyFree;

        return $this;
    }
}
