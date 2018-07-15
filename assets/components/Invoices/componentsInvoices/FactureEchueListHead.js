import React from 'react';
import PropTypes from 'prop-types';
import ChevronDown from 'react-icons/lib/fa/chevron-down';

const FactureEchueListHead = ({ clickChevron }) => (
  <div className="factures-echues-head">
    <div className="facture-echue-item">
      Client
      <ChevronDown className="chevron" onClick={clickChevron('clientEchue')} />
    </div>
    <div className="facture-echue-item">
      Retard
      <ChevronDown className="chevron" onClick={clickChevron('nbJours')} />
    </div>
  </div>
);

FactureEchueListHead.propTypes = {
  clickChevron: PropTypes.func.isRequired,
};

export default FactureEchueListHead;
