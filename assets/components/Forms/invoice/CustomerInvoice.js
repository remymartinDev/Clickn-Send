import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { openModal } from '~/store/reducers/localActionCreator';

class CustomerInvoice extends React.Component {
  state = {
    modal: false,
  }

  getCustomersJSX = () => (
    this.props.customers.map((customer) => {
      const valueModal = customer.pro ? customer.customerCompany : customer.lastname;
      return <option key={customer.id} value={customer.id} >{valueModal}</option>;
    })
  )

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChange = (e) => {
    const id = e.target.value;
    const myCustomer = this.props.customers.find(customer => Number(id) === Number(customer.id));
    if (myCustomer) {
      this.props.fillRemise(myCustomer.remise);
    }
    else {
      this.props.fillRemise('');
    }
  }

  render() {
    return (
      // <div className="add-client">
      <React.Fragment>
        <div className="add-client">
          <Field component="select" name="customer" className="fieldSelect" onChange={this.handleChange}>
            <option>Sélectionner votre client</option>
            {this.getCustomersJSX()}
          </Field>
          <Button onClick={this.props.openModal('customer', 'customer')} className="modal-button">
            <FontAwesomeIcon className="modal-icon" icon={faPlus} />
          </Button>
        </div>
        <div className="add-client-remise">
          <label htmlFor="remise" className="form-create-invoice-label">Remise Client (%)</label>
          <Field component="input" type="number" name="remise" className="form-create-invoice-field" />
        </div>
      </React.Fragment>
      // </div>
    );
  }
}

CustomerInvoice.propTypes = {
  openModal: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
  fillRemise: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  customers: state.data.customers,
});

const mapDispatchToProps = dispatch => ({
  fillRemise: (remise) => {
    dispatch(change('facture', 'remise', remise));
  },
  openModal: (view, field) => () => {
    dispatch(openModal(view, field));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(CustomerInvoice));
