import React from 'react';
import PropTypes from 'prop-types';
import FaEye from 'react-icons/lib/fa/eye';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDownload from 'react-icons/lib/fa/download';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faFileInvoiceDollar, faBuilding } from '@fortawesome/free-solid-svg-icons';

import './ClientItem.scss';

const ClientItem = ({
  customerCompany,
  lastname,
  firstname,
  companyAdress,
  countryCode,
  phone,
  mobile,
  email,
  comment,
  pro,
  vatNumber,
  remise,
  invoices,

}) => {
  console.log(customerCompany);
  const proIcon = {
    true: faBuilding,
    false: faUserTie,
  }

  return (
    <div className="list-contain-client">
      <FontAwesomeIcon className="list-item--icon" icon={proIcon[pro]} />
      <div className="list-item"> {pro ? customerCompany : lastname}</div>
      <div className="list-item">{vatNumber}</div>
      <div className="list-item">{companyAdress}</div>
      <div className="list-item">{countryCode}</div>
      <div className="list-item">{phone}</div>
      <div className="list-item">{mobile}</div>
      <div className="list-item">{email}</div>
      <div className="list-item">{remise} %</div>
      <FaEye className="list-item--icon" />
      <FaPencil className="list-item--icon" />
      <FaDownload className="list-item--icon" />
      <FontAwesomeIcon className="list-item--icon" icon={faFileInvoiceDollar} />
      <div className="list-item last-item">{comment}</div>
    </div>
  );
};

ClientItem.propTypes = {
  lastname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  companyAdress: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  email: PropTypes.number.isRequired,
};

export default ClientItem;
