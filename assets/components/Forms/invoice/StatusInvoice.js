import React from 'react';
import Axios from 'axios';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

class StatusInvoice extends React.Component {
  state = {
    status: [],
  }

  componentDidMount() {
    Axios.get('/api/status')
      .then(({ data: status }) => {
        this.setState({
          status,
        });
      });
    this.getStatusJSX();
  }

  getStatusJSX = () => (
    this.state.status.map(({ id, invoiceStatus }) => (
      <option key={id} value={id}>{invoiceStatus}</option>
    ))
  )

  render() {
    return (
      <React.Fragment>
        <Field component="select" name="status" className="fieldSelect status">
          <option>Sélectionner le statut</option>
          {this.getStatusJSX()}
        </Field>
        {
            (this.props.selectedStatus == 5) &&
            <div className="form-create-invoice recurringStatus">
              <label htmlFor="recurringTerm" className="form-create-invoice-label">Nombre de jours de récurrence</label>
              <Field component="input" type="number" name="recurringTerm" className="form-create-invoice-field" />
            </div>
        }
      </React.Fragment>
    );
  }
}

const selector = formValueSelector('facture');

const mapStateToProps = state => ({
  selectedStatus: selector(state, 'status'),
});
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusInvoice);
