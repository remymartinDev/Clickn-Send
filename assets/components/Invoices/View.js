import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './factures.scss';

const ViewDiv = ({ children }) => (
  <div className="view-div">
    {children}
  </div>
);

ViewDiv.propTypes = {
  children: PropTypes.any,
};
ViewDiv.defaultProps = {
  children: '',
};

class InvoiceView extends React.Component {

  state = {
    invoice: {},
    customer: {},
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.params);
    axios.get(`/api/invoice/${id}`)
      .then((response) => {
        this.setState({
          invoice: response.data,
          customer: response.data.customer,
        });
      });
  }

  render() {
    const { invoice } = this.state;
    const { customer } = this.state;
    console.log(this.state.customer.customerCompany);
    // console.log(this.state.invoice.customer.id);
    // console.log(customer.id);
    return (
      <div className="view view-invoice">
        <h1 className="view-title">Vue de votre client</h1>
        <Link to={`/invoices/${invoice.id}/edit`} className="view-link">
          <FontAwesomeIcon className="view-link-icon" icon={faPencilAlt} />
          Editer
        </Link>
        <ViewDiv>Nom du client</ViewDiv>
        <ViewDiv>{customer.pro ? customer.customerCompany : (customer.lastname + ' ' + customer.firstname)}</ViewDiv>
        
    
      </div>
    );
  }
}

InvoiceView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default InvoiceView;
