<?php

namespace App\Repository;

use App\Entity\Invoice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use App\Entity\Company;
use App\Entity\Customer;
use App\Entity\Status;
use DoctrineExtensions\Query\Mysql\DateFormat;

/**
 * @method Invoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invoice[]    findAll()
 * @method Invoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 * @method Invoice[]    findAllInvoicesByCompany($company)
 */
class InvoiceRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Invoice::class);
    }

//    /**
//     * @return Invoice[] Returns an array of Invoice objects
//     */
    
                                            //on utilise l'ID pour l'instant (SQL) car pas d'user connecté
    /* public function findAllInvoicesByCompany($company)
    {
        $em = $this->getEntityManager();

        $query = $em->createQuery(
             "SELECT DATE_FORMAT(i.date, '%Y-%m-%dT%H:%i:%s') as date, i.id, i.reference, i.amount_all_taxes, i.amount_dutty_free, i.paid, DATE_FORMAT(i.deadline1, '%Y-%m-%dT%H:%i:%s') as deadline1, DATE_FORMAT(i.deadline2, '%Y-%m-%dT%H:%i:%s') as deadline2, cu.id as customerID, cu.lastname, cu.firstname,cu.customer_company, cu.pro, s.invoice_status, co
                FROM App\Entity\Invoice i
                JOIN App\Entity\Customer cu, App\Entity\Company co, App\Entity\Status s
                WHERE i.customer = cu
                AND i.status = s
                AND i.company = co 
                AND i.company = :company"
        )->setParameter('company', $company);
        return $query->execute();
    }   */ 
        
    /*
    public function findOneBySomeField($value): ?Invoice
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        
    }
    */
    public function findForPdf($invoice)
    {
        $em = $this->getEntityManager();

        $query = $em->createQuery(
             "SELECT i,cu,co,ihp,st,pa
                FROM App\Entity\Invoice i, App\Entity\Status st, App\Entity\Payment pa
                INNER JOIN App\Entity\Customer cu, App\Entity\Company co, App\Entity\InvoiceHasProduct ihp 
                WHERE i = :invoice
                AND i.customer = cu
                AND i.status = st
                AND i.company = co
                AND i = pa.invoice
                AND i = ihp.invoice"
        )->setParameter('invoice', $invoice);
        return $query->execute();
    } 

}
