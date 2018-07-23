import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm } from 'redux-form';
import axios from 'axios';
import { FormattedDate } from 'react-intl';

import DropdownButton from '~/components/utils/DropdownButton';

import './ModalPaiement.scss';

class ModalPaiement extends React.Component {

  state = {
    methodes: [],
    payments: [],
  }

  componentDidMount() {
    axios.get('/api/payment/methods')
      .then((response) => {
        console.log(response.data);
        this.setState({
          methodes: response.data,
        });
      });

    axios.get(`/api/payments/${this.props.selectedInvoiceId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          payments: response.data,
        });
      });
  }

  getMethodesJSX = () => (
    this.state.methodes.map(methode => (
      <option key={methode.id} value={methode.id}>{methode.method}</option>
    ))
  )

  getPaymentsJSX = () => (
    this.state.payments.map(payment => (
      <div key={payment.id} className="list-contain-modal">
        <div className="list-item"><FormattedDate value={payment.date} /></div>
        <div className="list-item"> {payment.amount} €</div>
        <div className="list-item"> {payment.paymentMethode.method}</div>
        <DropdownButton componentType="paiment" id={payment.id} />
      </div>
    ))
   
  )

  render() {
    console.log('mon paiement', this.state.payments);
    return (

      <div>
        <h1 className="form-title">Paiement reçu</h1>
        <Form onSubmit={this.props.handleSubmit} className="form form-paiement">
          <label htmlFor="date" className="form-label">Date</label>
          <Field name="date" type="date" component="input" className="form-field" />
          <label htmlFor="amount" className="form-label">Montant</label>
          <Field name="amount" type="number" component="input" className="form-field" />
          <Field name="paymentMethod" component="select" className="fieldSelect-paiement">
            <option>méthode de paiement</option>
            {this.getMethodesJSX()}
          </Field>
          <button type="submit" className="form-button form-button-paiement">
            Valider
          </button>
        </Form>
        {
          this.state.payments.length !== 0
          &&
          <div className="list-container">
            <h1 className="form-title">Liste des paiements reçus</h1>
            <div className="list-contain-modal list-contain--head">
              <div className="list-item">Date</div>
              <div className="list-item">Montant</div>
              <div className="list-item">Mode de paiement</div>
            </div>
            <div> {this.getPaymentsJSX()} </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedInvoiceId: state.notreReducer.selectedInvoiceId,
});
const mapDispatchToProps = null;
const mergeProps = stateProps => ({
  ...stateProps,
  onSubmit: (values) => {
    axios.post(`/api/payment/new/${stateProps.selectedInvoiceId}`, values)
      .then((response) => {
        console.log(response);

      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(reduxForm({
  form: 'method',
})(ModalPaiement));

