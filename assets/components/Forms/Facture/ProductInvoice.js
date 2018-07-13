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
    
    this.props.changeAmountsTotal(allTotals.amountDuttyFree.toFixed(2), allTotals.taxesAmount.toFixed(2), allTotals.amountAllTaxes.toFixed(2));
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
            fillPrice={this.props.fillPrice}
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
          className="form-btn"
          type="button"
          onClick={this.calculateTotal}
        >
          Calculer le total
        </Button>

        <label htmlFor="amountDuttyFree">Prix Total HT</label>
        <Field component="input" type="number" name="amountDuttyFree" parse={value => Number(value)} />
        <label htmlFor="taxesAmount">Montant Total de la TVA</label>
        <Field component="input" type="number" name="taxesAmount" parse={value => Number(value)} />
        <label htmlFor="amountAllTaxes">Prix Total TTC</label>
        <Field component="input" type="number" name="amountAllTaxes" parse={value => Number(value)} />
      </div>
    );
  }
}

ProductInvoice.propTypes = {
  changeProducts: PropTypes.func.isRequired,
  fillPrice: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

const selector = formValueSelector('facture');

const mapStateToProps = state => ({
  allFields: selector(state, 'invoiceHasProducts'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeAmountsTotal: (prixHT, montantTVA, prixTTC) => {
    dispatch(change('facture', 'amountDuttyFree', prixHT));
    dispatch(change('facture', 'taxesAmount', montantTVA));
    dispatch(change('facture', 'amountAllTaxes', prixTTC));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture'
})(ProductInvoice));

