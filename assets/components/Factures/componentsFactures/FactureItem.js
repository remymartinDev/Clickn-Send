import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
      <Media query="(max-width: 769px)">
        {matches => (matches && <FontAwesomeIcon icon={faCoffee} />)}
      </Media>
      <div className="facture-item">{customer.pro ? customer.customerCompany : customer.lastname}</div>
      <Media query="(min-width: 769px)">
        {matches => (matches && <div className="facture-item">{humainDate}</div>)}
      </Media>
      <div className="facture-item"> {amountAllTaxes} € </div>
      <Media query="(min-width: 769px)">
        {matches => (matches && <div className="facture-item">{status.invoiceStatus}</div>)}
      </Media>
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
