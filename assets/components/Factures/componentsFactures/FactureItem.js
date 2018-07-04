import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';

import './FactureItem.scss';
/*eslint-disable*/
const FactureItem = ({ customer_company, pro, firstname, date, amount_all_taxes, invoice_status }) => {
  const formatedDate = new Date(date);
  const humainDate = `${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`;
  return (
    <div className="facture-contain">
      <div className="facture-item">{pro ? customer_company : firstname}</div>
      <div className="facture-item">{humainDate}</div>
      <div className="facture-item"> {amount_all_taxes} € </div>
      <div className="facture-item">{invoice_status}</div>
      <FaEye />
      <FaPencil />
      <FaDownload />
    </div>
  );
};


FactureItem.propTypes = {
  company_name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount_all_taxes: PropTypes.string.isRequired,
  invoice_status: PropTypes.string.isRequired,
};

export default FactureItem;
