<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $denomination;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    private $reference;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2)
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $unity;

    
//USELESS RELATION
    ///**
    // * @ORM\OneToMany(targetEntity="App\Entity\InvoiceHasProduct", mappedBy="product")
    // */
    //private $invoiceHasProducts;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company")
     * @ORM\JoinColumn(nullable=false)
     */
    private $company;


//USELESS RELATION
    /* public function __construct()
    {
        $this->invoiceHasProducts = new ArrayCollection();
    } */

    public function getId()
    {
        return $this->id;
    }

    public function getDenomination(): ?string
    {
        return $this->denomination;
    }

    public function setDenomination(string $denomination): self
    {
        $this->denomination = $denomination;

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(?string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getUnity(): ?string
    {
        return $this->unity;
    }

    public function setUnity(string $unity): self
    {
        $this->unity = $unity;

        return $this;
    }


//USELESS RELATION
    ///**
     //* @return Collection|InvoiceHasProduct[]
     //*/
    /* public function getInvoiceHasProducts(): Collection
    {
        return $this->invoiceHasProducts;
    }

    public function addInvoiceHasProduct(InvoiceHasProduct $invoiceHasProduct): self
    {
        if (!$this->invoiceHasProducts->contains($invoiceHasProduct)) {
            $this->invoiceHasProducts[] = $invoiceHasProduct;
            $invoiceHasProduct->setProduct($this);
        }

        return $this;
    }

    public function removeInvoiceHasProduct(InvoiceHasProduct $invoiceHasProduct): self
    {
        if ($this->invoiceHasProducts->contains($invoiceHasProduct)) {
            $this->invoiceHasProducts->removeElement($invoiceHasProduct);
            // set the owning side to null (unless already changed)
            if ($invoiceHasProduct->getProduct() === $this) {
                $invoiceHasProduct->setProduct(null);
            }
        }

        return $this;
    } */

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }
}
