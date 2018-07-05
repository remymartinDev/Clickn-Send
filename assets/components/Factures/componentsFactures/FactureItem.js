import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';

import './FactureItem.scss';

const FactureItem = ({
  customer,
  date,
  amountAllTaxes,
  status,
}) => {
  const formatedDate = new Date(date);
  const humainDate = `${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`;
  return (
    <div className="facture-contain">
      <div className="facture-item">{customer.pro ? customer.customerCompany : customer.lastname}</div>
      <div className="facture-item">{humainDate}</div>
      <div className="facture-item"> {amountAllTaxes} € </div>
      <div className="facture-item">{status.invoiceStatus}</div>
      <FaEye />
      <FaPencil />
      <FaDownload />
    </div>
  );
};

FactureItem.propTypes = {
  customer: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  amountAllTaxes: PropTypes.string.isRequired,
  status: PropTypes.object.isRequired,
};

export default FactureItem;
