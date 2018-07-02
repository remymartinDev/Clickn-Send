<?php

namespace App\Entity;

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
}
