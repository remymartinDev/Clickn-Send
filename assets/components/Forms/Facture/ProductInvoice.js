import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';

import ProductInvoiceItem from './ProductInvoiceItem';

class ProductInvoice extends React.Component {
  state = {
    products: [],
    modal: false,
    loading: true,
  }

  componentDidMount() {
    
    this.getProducts();
  }

  getProducts = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    axios.get('/api/products')
      .then(({ data: products }) => {
        this.setState({
          products,
          loading: false,
        });
      });
  }

  getProductsJSX = () => (
    this.state.products.map(product => (
      <option key={product.id} value={product.id} >{product.denomination}</option>
    ))
  )

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  productSubmit = (fieldName, values, callback) => {
    axios.post('/api/product/new', values)
      .then((response) => {
        if (response.data.succes) {
          callback();
          this.props.changeProducts(response.data.id, this.getProducts, fieldName);
        }
      });
  }

  calculateTotal = () => {
    console.log('remise', this.props.remiseCustomer);
    const allInfosProducts = this.props.allFields;
    const allTotals = allInfosProducts.reduce((total, item) => {
      return {
        amountAllTaxes: total.amountAllTaxes + Number(item.amountAllTaxes),
        amountDuttyFree: total.amountDuttyFree + Number(item.amountDuttyFree),
        taxesAmount: total.taxesAmount + Number(item.taxesAmount), 
      };
    }, {
      amountAllTaxes: 0,
      amountDuttyFree: 0,
      taxesAmount: 0, 
    });
    console.log(allTotals);
    const { remiseCustomer } = this.props;

    const amountCustomerRemise = allTotals.amountDuttyFree * remiseCustomer / 100;
    const amountDuttyFree = allTotals.amountDuttyFree - amountCustomerRemise;
    const amountAllTaxes = amountDuttyFree + allTotals.taxesAmount;
    
    this.props.changeAmountsTotal(amountCustomerRemise.toFixed(2), amountDuttyFree.toFixed(2), allTotals.taxesAmount.toFixed(2), amountAllTaxes.toFixed(2));
  }

  render() { 
    return (
      <div className="add-product">
        { this.props.fields.map((product, index) => (
          <ProductInvoiceItem
            key={index}
            {...this.props}
            product={product}
            index={index}
            products={this.state.products}
            loading={this.state.loading}
            productSubmit={this.productSubmit}
            // fillPrice={this.props.fillPrice}
          />
        )) }
        <Button
          className="form-btn form-btn-add-product"
          id="btn-activated"
          type="button"
          onClick={() => this.props.fields.push({})}
        >
          Ajouter un produit
        </Button>
        <Button
          className="form-btn-calcul"
          type="button"
          onClick={this.calculateTotal}
        >
          Calculer le total
        </Button>
        <label htmlFor="amountCustomerRemise" className="form-create-invoice-label-disable">Montant de la remise client</label>
        <Field component="input" type="number" name="amountCustomerRemise" parse={value => Number(value)} disabled className="form-create-invoice-field-disable"/>
        <label htmlFor="amountDuttyFree" className="form-create-invoice-label-disable">Prix Total HT</label>
        <Field component="input" type="number" name="amountDuttyFree" parse={value => Number(value)} disabled className="form-create-invoice-field-disable"/>
        <label htmlFor="taxesAmount" className="form-create-invoice-label-disable">Montant Total de la TVA</label>
        <Field component="input" type="number" name="taxesAmount" parse={value => Number(value)} disabled className="form-create-invoice-field-disable"/>
        <label htmlFor="amountAllTaxes" className="form-create-invoice-label-disable">Prix Total TTC</label>
        <Field component="input" type="number" name="amountAllTaxes" parse={value => Number(value)} disabled className="form-create-invoice-field-disable"/>
      </div>
    );
  }
}

ProductInvoice.propTypes = {
  changeProducts: PropTypes.func.isRequired,
  fillPrice: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  remiseCustomer: PropTypes.string,
  changeAmountsTotal: PropTypes.func.isRequired,
};

ProductInvoice.defaultPropTypes = {
  remiseCustomer: '0',
};

const selector = formValueSelector('facture');

const mapStateToProps = state => ({
  allFields: selector(state, 'invoiceHasProducts'),
  remiseCustomer: selector(state, 'remise'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeAmountsTotal: (amountCustomerRemise, prixHT, montantTVA, prixTTC) => {
    dispatch(change('facture', 'amountCustomerRemise', amountCustomerRemise));
    dispatch(change('facture', 'amountDuttyFree', prixHT));
    dispatch(change('facture', 'taxesAmount', montantTVA));
    dispatch(change('facture', 'amountAllTaxes', prixTTC));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
  asyncBlurFields: [],
})(ProductInvoice));

