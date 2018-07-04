import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';

import './FactureItem.scss';
/*eslint-disable*/
const FactureItem = ({ company_name, date, amount_all_taxes, invoice_status }) => (
  <div className="facture-contain">
    <div className="facture-item">{company_name}</div>
    <div className="facture-item">{date}</div>
    <div className="facture-item"> {amount_all_taxes} € </div>
    <div className="facture-item">{invoice_status}</div>
    <FaEye />
    <FaPencil />
    <FaDownload />
  </div>
);

FactureItem.propTypes = {
  company_name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount_all_taxes: PropTypes.string.isRequired,
  invoice_status: PropTypes.string.isRequired,
};

export default FactureItem;
