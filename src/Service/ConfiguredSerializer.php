<?php
namespace App\Service;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class ConfiguredSerializer
{
    public function getConfiguredSerializer()
    {
        //on configure le serializer pour normaliser des tableaux d objet php
        $encoder = new JsonEncoder();
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });
        $normalizer->setIgnoredAttributes(["__initializer__", "__cloner__","__isInitialized__"]);
        $serializer = new Serializer(array($normalizer), array($encoder));

        return $serializer;
    }
}