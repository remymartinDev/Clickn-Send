import React from 'react';
import ChevronDown from 'react-icons/lib/fa/chevron-down';

const FactureEchueListHead = () => (
  <div className="factures-echues-head">
    <div className="facture-echue-item">Client <ChevronDown className="chevron" /></div>
    <div className="facture-echue-item">Retard  <ChevronDown className="chevron" /></div>
  </div>
);

export default FactureEchueListHead;
