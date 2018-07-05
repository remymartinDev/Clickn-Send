import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt  } from '@fortawesome/free-solid-svg-icons';
import StatusDevis from '~/images/statusdevis.svg';
import StatusInvoice from '~/images/statusinvoice.svg';
import StatusRecurrent from '~/images/statusrecurrent.svg';
import StatusRejected from '~/images/statusrejected.svg';


import './FactureItem.scss';

const FactureItem = ({
  customer,
  date,
  amountAllTaxes,
  status,
}) => {
  const formatedDate = new Date(date);
  const humainDate = `${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`;
  const statusIcons = {
    devis: StatusDevis,
    'devis refusé': StatusRejected,
    brouillon: faFileAlt,
    facture: StatusInvoice,
    'facture récurrente': StatusRecurrent,
  };
  return (
    <div className="facture-contain">
      <Media query="(max-width: 769px)">
        {matches => (matches && <FontAwesomeIcon icon={faFileAlt} />)}
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
