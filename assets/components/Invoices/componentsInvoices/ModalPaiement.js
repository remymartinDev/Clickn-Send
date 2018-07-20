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

  render() {
    return (

      <div>
        <h1>Paiement reçu</h1>
        <Form onSubmit={this.props.handleSubmit}>
          <label htmlFor="date">Date</label>
          <Field name="date" type="date" component="input" />
          <label htmlFor="amount">Montant</label>
          <Field name="amout" type="number" component="input" />
          <Field name="paymentMethode" component="select">
            <option>méthode de paiement</option>
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

ModalPaiement.propTypes = {
  selectedInvoiceId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  selectedInvoiceId: state.notreReducer.selectedInvoiceId,
});
const mapDispatchToProps = null;
const mergeProps = stateProps => ({
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


