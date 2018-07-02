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

    public function setInvoice(?Invoice $invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }
}
