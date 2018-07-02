<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StatusRepository")
 */
class Status
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=25)
     */
    private $invoice_status;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Invoice", mappedBy="status")
     */
    private $invoices;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getInvoiceStatus(): ?string
    {
        return $this->invoice_status;
    }

    public function setInvoiceStatus(string $invoice_status): self
    {
        $this->invoice_status = $invoice_status;

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setStatus($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getStatus() === $this) {
                $invoice->setStatus(null);
            }
        }

        return $this;
    }
}
