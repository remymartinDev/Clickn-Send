import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import ChevronDown from 'react-icons/lib/fa/chevron-down';
// import ChevronUp from 'react-icons/lib/fa/chevron-up';

import './FacturesListHead.scss';

const FacturesListHead = ({ clickChevron }) => (
  <div className="list-contain-facture list-contain list-contain--head">
    <div className="list-item">
      Client
      <ChevronDown className="chevron" onClick={clickChevron('client')} />
    </div>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Date
          <ChevronDown className="chevron" onClick={clickChevron('date')} />
        </div>
      )}
    </Media>
    <div className="list-item">
      Montant
      <ChevronDown className="chevron" onClick={clickChevron('montant')} />
    </div>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Statut
          <ChevronDown className="chevron" onClick={clickChevron('statut')} />
        </div>)}
    </Media>
  </div>
);

FacturesListHead.propTypes = {
  clickChevron: PropTypes.func.isRequired,
};

export default FacturesListHead;
