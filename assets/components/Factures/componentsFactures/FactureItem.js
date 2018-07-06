import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { FormattedDate } from 'react-intl';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFileInvoiceDollar, faFileInvoice, faFileExcel, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import './FactureItem.scss';

const FactureItem = ({
  customer,
  date,
  amountAllTaxes,
  status,
}) => {
  const statusIcons = {
    devis: faFileInvoice,
    'devis refusé': faFileExcel,
    brouillon: faFileAlt,
    facture: faFileInvoiceDollar,
    'facture récurrente': faUndoAlt,
  };
  return (
    <div className="facture-contain">
      <Media query="(max-width: 769px)">
        {matches => (matches && <FontAwesomeIcon className="facture-item--icon" icon={statusIcons[status.invoiceStatus]} />)}
      </Media>
      <div className="facture-item">{customer.pro ? customer.customerCompany : customer.lastname}</div>
      <Media query="(min-width: 769px)">
        {matches => (matches && <FormattedDate value={new Date(date)} />)}
      </Media>
      <div className="facture-item"> {amountAllTaxes} € </div>
      <Media query="(min-width: 769px)">
        {matches => (matches && <div className="facture-item">{status.invoiceStatus}</div>)}
      </Media>
      <FaEye className="facture-item--icon" />
      <FaPencil className="facture-item--icon" />
      <FaDownload className="facture-item--icon" />
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
