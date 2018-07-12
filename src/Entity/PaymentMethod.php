<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PaymentMethodRepository")
 */
class PaymentMethod
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $method;


// USELESS RELATION    
    ///**
    // * @ORM\OneToMany(targetEntity="App\Entity\Payment", mappedBy="paymentMethode")
    // */
    //private $payments;

// USELESS RELATION
    /* public function __construct()
    {
        $this->payments = new ArrayCollection();
    }*/
    public function getId()
    {
        return $this->id;
    }

    public function getMethod(): ?string
    {
        return $this->method;
    }

    public function setMethod(string $method): self
    {
        $this->method = $method;

        return $this;
    }


// USELESS RELATION
    ///**
    // * @return Collection|Payment[]
    // */
    /* public function getPayments(): Collection
    {
        return $this->payments;
    }

    public function addPayment(Payment $payment): self
    {
        if (!$this->payments->contains($payment)) {
            $this->payments[] = $payment;
            $payment->setPaymentMethode($this);
        }

        return $this;
    }

    public function removePayment(Payment $payment): self
    {
        if ($this->payments->contains($payment)) {
            $this->payments->removeElement($payment);
            // set the owning side to null (unless already changed)
            if ($payment->getPaymentMethode() === $this) {
                $payment->setPaymentMethode(null);
            }
        }

        return $this;
    } */
}
