<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MemberRepository")
 */
class Member extends BaseUser
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Company", inversedBy="members")
     * @ORM\JoinColumn(nullable=false)
     */
    protected $company;

    public function __construct()
    {
        parent::__construct();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany($company): self
    {
        $this->company = $company;

        return $this;
    }

    public function hydrate($member_data)
    {
        $this->setPlainPassword($member_data['_password']);
        $this->addRole($member_data['role']);
        $this->setUsername($member_data['_username']);
    }
}
