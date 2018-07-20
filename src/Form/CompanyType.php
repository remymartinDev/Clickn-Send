<?php

namespace App\Form;

use App\Entity\Company;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CompanyType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('company_name')
            ->add('company_adress')
            ->add('phone')
            ->add('fax')
            ->add('vat_number')
            ->add('email')
            ->add('bank_iban')
            ->add('bank_bic')
            ->add('bank_rib')
            ->add('bank_domiciliation')
            ->add('payment_term')
            ->add('logo')
            ->add('zipCode')
            ->add('city')
            ->add('companyInformation')
            ->add('countryCode')
            ->add('website')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Company::class,
        ]);
    }
}
