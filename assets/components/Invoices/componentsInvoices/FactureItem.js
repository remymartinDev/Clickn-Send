import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { FormattedDate } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFileInvoiceDollar, faFileInvoice, faFileExcel, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import DropdownButton from '~/components/utils/DropdownButton';

import './FactureItem.scss';

const FactureItem = ({
  customer,
  date,
  amountAllTaxes,
  status,
  id,
}) => {
  const statusIcons = {
    devis: faFileInvoice,
    'devis refusé': faFileExcel,
    brouillon: faFileAlt,
    list: faFileInvoiceDollar,
    'facture récurrente': faUndoAlt,
  };
  return (
    <div className="list-contain list-contain-facture">
      <Media query="(max-width: 769px)">
        {matches => (matches && <FontAwesomeIcon className="list-item--icon" icon={statusIcons[status.invoiceStatus]} />)}
      </Media>
      <div className="list-item">{customer.pro ? customer.customerCompany : customer.lastname}</div>
      <Media query="(min-width: 769px)">
        {matches => (matches && <FormattedDate value={new Date(date)} />)}
      </Media>
      <div className="list-item"> {amountAllTaxes} € </div>
      <Media query="(min-width: 769px)">
        {matches => (matches && <div className="list-item">{status.invoiceStatus}</div>)}
      </Media>
      <DropdownButton componentType="invoice" id={id} />
    </div>
  );
};

FactureItem.propTypes = {
  customer: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  amountAllTaxes: PropTypes.string.isRequired,
  status: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default FactureItem;
