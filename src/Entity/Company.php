<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CompanyRepository")
 */
class Company
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
    private $company_name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $company_adress;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $fax;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $vat_number;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $bank_iban;

    /**
     * @ORM\Column(type="string", length=8)
     */
    private $bank_bic;

    /**
     * @ORM\Column(type="string", length=23, nullable=true)
     */
    private $bank_rib;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $bank_domiciliation;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $payment_term;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $logo;

    /** 
     * @ORM\OneToMany(targetEntity="App\Entity\Invoice", mappedBy="company")
     */
/*     private $invoices; */

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Customer", mappedBy="company")
     */
/*     private $customers; */

    /*
     * @ORM\OneToMany(targetEntity="App\Entity\Member", mappedBy="company")
     */
/*     private $members; */

/*     public function __construct()
    {
        $this->invoices = new ArrayCollection();
        $this->customers = new ArrayCollection();
        $this->members = new ArrayCollection();
    } */

    public function getId()
    {
        return $this->id;
    }

    public function getCompanyName(): ?string
    {
        return $this->company_name;
    }

    public function setCompanyName(string $company_name): self
    {
        $this->company_name = $company_name;

        return $this;
    }

    public function getCompanyAdress(): ?string
    {
        return $this->company_adress;
    }

    public function setCompanyAdress(string $company_adress): self
    {
        $this->company_adress = $company_adress;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

        return $this;
    }

    public function getVatNumber(): ?string
    {
        return $this->vat_number;
    }

    public function setVatNumber(string $vat_number): self
    {
        $this->vat_number = $vat_number;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getBankIban(): ?string
    {
        return $this->bank_iban;
    }

    public function setBankIban(string $bank_iban): self
    {
        $this->bank_iban = $bank_iban;

        return $this;
    }

    public function getBankBic(): ?string
    {
        return $this->bank_bic;
    }

    public function setBankBic(string $bank_bic): self
    {
        $this->bank_bic = $bank_bic;

        return $this;
    }

    public function getBankRib(): ?string
    {
        return $this->bank_rib;
    }

    public function setBankRib(string $bank_rib): self
    {
        $this->bank_rib = $bank_rib;

        return $this;
    }

    public function getBankDomiciliation(): ?string
    {
        return $this->bank_domiciliation;
    }

    public function setBankDomiciliation(string $bank_domiciliation): self
    {
        $this->bank_domiciliation = $bank_domiciliation;

        return $this;
    }

    public function getPaymentTerm(): ?string
    {
        return $this->payment_term;
    }

    public function setPaymentTerm(?string $payment_term): self
    {
        $this->payment_term = $payment_term;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

/*     /**
     * @return Collection|Invoice[]
     */
/*     public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCompany($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getCompany() === $this) {
                $invoice->setCompany(null);
            }
        }

        return $this;
    } */

/*     /**
     * @return Collection|Customer[]
     */
/*     public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers[] = $customer;
            $customer->setCompany($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->contains($customer)) {
            $this->customers->removeElement($customer);
            // set the owning side to null (unless already changed)
            if ($customer->getCompany() === $this) {
                $customer->setCompany(null);
            }
        }

        return $this;
    } */

/*     /**
     * @return Collection|Member[]
     */
/*     public function getMembers(): Collection
    {
        return $this->members;
    } */
/* 
    public function addMember(Member $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members[] = $member;
            $member->setCompany($this);
        }

        return $this;
    } */

/*     public function removeMember(Member $member): self
    {
        if ($this->members->contains($member)) {
            $this->members->removeElement($member);
            // set the owning side to null (unless already changed)
            if ($member->getCompany() === $this) {
                $member->setCompany(null);
            }
        } */

/*         return $this;
    } */
}
