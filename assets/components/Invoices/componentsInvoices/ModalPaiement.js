import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm } from 'redux-form';
import axios from 'axios';

class ModalPaiement extends React.Component {

  state = {
    methodes: [],
  }

  componentDidMount() {
    console.log('je did mount');
    axios.get('/api/payment/methods')
      .then((response) => {
        console.log(response.data);
        this.setState({
          methodes: response.data,
        });
      });
  }

  getMethodesJSX = () => (
    this.state.methodes.map(methode => (
      <option key={methode.id} value={methode.id}>{methode.method}</option>
    ))
  )

  submit = () => {
    axios.post(`/api/payment/new/${this.props.selectedInvoiceId}`)
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (

      <div>
        <h1>Paiement reçu</h1>
        <Form onSubmit={this.submit}>
          <label htmlFor="date">Date</label>
          <Field name="date" type="date" component="input" />
          <label htmlFor="amount">Montant</label>
          <Field name="amout" type="number" component="input" />
          <Field name="paymentMethode" component="select">
            <option>Sélectionner votre mode de payement</option>
            {this.getMethodesJSX()}
          </Field>
          <button type="submit">
            Valider
          </button>
        </Form>
        
      </div>
    )
  }

}

const mapStateToProps = state => ({
  selectedInvoiceId: state.notreReducer.selectedInvoiceId,
});
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'method',
})(ModalPaiement));
