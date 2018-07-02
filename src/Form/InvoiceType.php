<?php

namespace App\Form;

use App\Entity\Invoice;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InvoiceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('date')
            ->add('reference')
            ->add('amount_all_taxes')
            ->add('amount_dutty_free')
            ->add('taxes_amount')
            ->add('paid')
            ->add('down_payment')
            ->add('reminder')
            ->add('deadline1')
            ->add('deadline2')
            ->add('comment')
            ->add('customer')
            ->add('status')
            ->add('company')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Invoice::class,
        ]);
    }
}
