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
    paid: false,
    totalInvoice: null,
    restToPay: null,
  }

  componentDidMount() {
    axios.get('/api/payment/methods')
      .then((response) => {
        this.setState({
          methodes: response.data,
        });
      });

    this.loadPayments();
    this.loadInvoiceToPay();
    this.restToPay();
  }

  onSubmit = (values) => {
    axios.post(`/api/payment/new/${this.props.selectedInvoiceId}`, values)
      .then((response) => {
        if (response.data.succes) {
          this.restToPay();
          axios.get(`/api/payments/${this.props.selectedInvoiceId}`)
            .then((response) => {
              this.setState({
                payments: response.data,
                paid: response.data.invoicePaid,
              });
            });
        }
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
        <DropdownButton componentType="payment" id={payment.id} invoiceId={this.props.selectedInvoiceId} load={this.loadPayments} />
      </div>
    ))
  )

  loadPayments = () => {
    axios.get(`/api/payments/${this.props.selectedInvoiceId}`)
      .then((response) => {
        const { paid } = response.data[0] ? response.data[0].invoice : false;
        this.setState({
          payments: response.data,
          paid,
        });
        this.restToPay();
      });
  }

  loadInvoiceToPay = () => {
    axios.get(`/api/invoice/${this.props.selectedInvoiceId}`)
      .then((response) => {
        console.log(response);
        const totalInvoice = response.data.amountAllTaxes;
        this.setState({
          totalInvoice,
        });
        this.restToPay();
      });
  }

  restToPay = () => {
    console.log('total invoice to count', this.state.totalInvoice);
    let restToPay = null;
    if (this.state.payments.length !== 0) {
      restToPay = this.state.payments.reduce((total, payment) => {
       return total + payment.amount;
      });
    }
    else {
      restToPay = this.state.totalInvoice;

    }
    console.log('restToPay to return', this.state.restToPay);
    this.setState({
      restToPay,
    });
  }

  render() {
    console.log('total invoice', this.state.totalInvoice);
    console.log('payments', this.state.payments);
    console.log('restToPay', this.state.restToPay);

    return (

      <div>
        <h1 className="form-title">Paiement reçu</h1>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form form-paiement">
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
          this.state.paid ? <div className="invoice-paid">Facture Payée</div> : <div className="invoice-unpaid">Reste à payer: {this.state.restToPay} €</div>
        }
        
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


export default connect(
  mapStateToProps,
  null,
)(reduxForm({
  form: 'method',
})(ModalPaiement));

