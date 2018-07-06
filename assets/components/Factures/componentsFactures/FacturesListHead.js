import React from 'react';
import Media from 'react-media';
import ChevronDown from 'react-icons/lib/fa/chevron-down';

import './FacturesListHead.scss';

const FacturesListHead = () => (
  <div className="facture-contain facture-contain--head">
    <div className="facture-item">Client <ChevronDown className="chevron" /></div>
    <Media query="(min-width: 769px)">
      {matches => (matches && <div className="facture-item">Date <ChevronDown className="chevron" /></div>)}
    </Media>
    <div className="facture-item">Montant  <ChevronDown className="chevron" /></div>
    <Media query="(min-width: 769px)">
      {matches => (matches && <div className="facture-item">Statut <ChevronDown className="chevron" /></div>)}
    </Media>
  </div>
);

export default FacturesListHead;
