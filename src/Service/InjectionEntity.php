<?php
namespace App\Service;

use App\Repository\CompanyRepository;
use App\Repository\CustomerRepository;
use App\Repository\InvoiceRepository;
use App\Repository\InvoiceHasProduct;
use App\Repository\MemberRepository;
use App\Repository\PayementRepository;
use App\Repository\PayementMethodRepository;
use App\Repository\ProductRepository;
use App\Repository\RoleRepository;
use App\Repository\StatusRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class InjectionEntity
{
    public function entity($entity, RegistryInterface $registry)
    {
        $repo = new CompanyRepository($registry);

        $repos = [
            "company" => $companyRep,
            "customer" => $customerRep,
            "invoice" => $invoiceRep,
            "invoiceHasProduct" => $invoiceHasProductRep,
            "member" => $memberRep,
            "payement" => $payementRep,
            "payementMethod" => $payementMethodRep,
            "product" => $productRep,
            "role" => $roleRep,
            "status" => $statusRep,
        ];

        $entityNeeded = $repo->findOneById($data_array[$entity]['id']);

        return $entityNeeded;
    }
}

/* , CompanyRepository $companyRep, CustomerRepository $customerRep, InvoiceRepository $invoiceRep, InvoiceHasProduct $invoiceHasProductRep, MemberRepository $memberRep, PayementRepository $payementRep, PayementMethodeRepository $payementMethodRep, ProductRepository $productRep, RoleRepository $roleRep, StatusRepository $statusRep */