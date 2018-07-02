<?php

namespace App\Entity;

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

    public function getTaxesAmount(): ?\DateTimeInterface
    {
        return $this->taxes_amount;
    }

    public function setTaxesAmount(\DateTimeInterface $taxes_amount): self
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

    public function getDeadline1(): ?\DateTimeInterface
    {
        return $this->deadline1;
    }

    public function setDeadline1(\DateTimeInterface $deadline1): self
    {
        $this->deadline1 = $deadline1;

        return $this;
    }

    public function getDeadline2(): ?\DateTimeInterface
    {
        return $this->deadline2;
    }

    public function setDeadline2(?\DateTimeInterface $deadline2): self
    {
        $this->deadline2 = $deadline2;

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
}
