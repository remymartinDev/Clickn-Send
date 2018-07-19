import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Media from 'react-media';

import './ClientItem.scss';
import DropdownButton from '../../utils/DropdownButton';

const CustomerItem = ({
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
  id,
}) => {
  const proIcon = {
    true: faBuilding,
    false: faUserTie,
  };

  return (
    <div className="list-contain-client">
      <FontAwesomeIcon className="list-item--icon" icon={proIcon[pro]} />
      <div className="list-item"> {pro ? customerCompany : `${lastname} ${firstname}` }</div>
      <div className="list-item">{vatNumber}</div>
      <Media query="(min-width: 769px)" >
        {matches => (
          matches
          &&
          <React.Fragment>
            <div className="list-item">{companyAdress}</div>
            <div className="list-item">{countryCode}</div>
            <div className="list-item">{phone}</div>
            <div className="list-item">{mobile}</div>
            <div className="list-item">{email}</div>
            <div className="list-item">{remise} %</div>
          </React.Fragment>
        )}
      </Media>
      <DropdownButton componentType="customer" id={id} />
      <div className="list-item last-item">{comment}</div>
    </div>
  );
};

CustomerItem.propTypes = {
  lastname: PropTypes.string.isRequired,
  pro: PropTypes.bool.isRequired,
  firstname: PropTypes.string.isRequired,
  companyAdress: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerCompany: PropTypes.string,
  phone: PropTypes.string.isRequired,
  comment: PropTypes.string,
  vatNumber: PropTypes.string.isRequired,
  remise: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

CustomerItem.defaultProps = {
  comment: '',
  customerCompany: null,
};

export default CustomerItem;
