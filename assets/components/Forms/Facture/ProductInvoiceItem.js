import React from 'react';
import { Field, reduxForm, formValueSelector, change, arrayRemove } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FaTrash from 'react-icons/lib/fa/trash';
import axios from 'axios';

import CreateProduct from '~/components/Forms/Produit/Create';
import Loading from '~/components/utils/Loading';

class ProductInvoiceItem extends React.Component {
  state = {
    modal: false,
  }

  getProductsJSX = () => (
    this.props.products.map(product => (
      <option key={product.id} value={product.id} >{product.denomination}</option>
    ))
  )

  productSubmit = fieldName => (values) => {
    console.log('in product Submit', values);
    axios.post('/api/product/new', values)
      .then((response) => {
        console.log(response);
        if (response.succes) {
          this.props.selectProduct(response.id, fieldName);
          this.props.fillPrice(values.price, fieldName);
        }
      });
    this.props.productSubmit(fieldName, values, this.toggle);
  }
  handleChange = fieldName => (e) => {
    this.props.fillPrice(e.target.value, fieldName);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  calculate = () => {
    const {
      price,
      quantity,
      vatRate,
      remise,
      remiseType,
    } = this.props;

    let prixHT = null;
    let amountProductRemise = null;

    if (remiseType === 'percent') {
      amountProductRemise = ((price * quantity) * remise / 100);
      prixHT = (price * quantity) - amountProductRemise;
    }
    else if (remiseType === 'absolute') {
      amountProductRemise = remise;
      prixHT = (price * quantity) - remise;
    }

    const montantTVA = prixHT * vatRate / 100;
    const prixTTC = prixHT + montantTVA;
    this.props.changeAmounts(amountProductRemise.toFixed(2), prixHT.toFixed(2), montantTVA.toFixed(2), prixTTC.toFixed(2));
  }

  render() {
    const { product, index, remove } = this.props;
    console.log(product, index);
    return (
      <div className="add-product-select">
        <div className="add-product-select-product">
          <Field component="select" name={`${product}.product`} className="fieldSelect" onChange={this.handleChange(`${product}`)}>
            <option>Sélectionner votre produit</option>
            {this.getProductsJSX()}
          </Field>
          <Button onClick={this.toggle} className="modal-button">
            <FontAwesomeIcon className="modal-icon" icon={faPlus} />
          </Button>
          {this.props.loading && <Loading />}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="custom-modal">
          <ModalHeader toggle={this.toggle}>Créer votre produit</ModalHeader>
          <ModalBody>
            <CreateProduct onSubmit={this.productSubmit(`${product}`)} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <label
          htmlFor={`${product}.price`}
          className="form-create-invoice-label"
        >
          Prix
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.price`}
          parse={value => Number(value)}
          className="form-create-invoice-field"
        />
        <label
          htmlFor={`${product}.quantity`}
          className="form-create-invoice-label"
        >
          Quantité
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.quantity`}
          parse={value => Number(value)}
          className="form-create-invoice-field"
        />
        <label
          htmlFor={`${product}.vatRate`}
          className="form-create-invoice-label"
        >
          Taux de TVA (%)
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.vatRate`}
          parse={value => Number(value)}
          className="form-create-invoice-field"
        />
        <div >
          <label
            htmlFor={`${product}.remise`}
            className="form-create-invoice-label"
          >
            Remise
          </label>
          <div className="form-create-invoice-radio">
            <label className="form-create-invoice-radio-label">
              <Field name={`${product}.remiseType`} component="input" type="radio" value="percent" />
              Pourcentage
            </label>
            <label className="form-create-invoice-radio-label">
              <Field name={`${product}.remiseType`} component="input" type="radio" value="absolute" />
              Absolu
            </label>
          </div>
        </div>
        <Field
          component="input"
          type="number"
          name={`${product}.remise`}
          parse={value => Number(value)}
          className="form-create-invoice-field"
        />

        <Button onClick={this.calculate} className="form-btn-calcul form-btn-calcul-product">Calculer</Button>

        <label
          htmlFor={`${product}.amountProductRemise`}
          className="form-create-invoice-label-disable"
        >
          Montant de la remise
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.amountProductRemise`}
          disabled
          parse={value => Number(value)}
          className="form-create-invoice-field-disable"
        />

        <label
          htmlFor={`${product}.amountDuttyFree`}
          className="form-create-invoice-label-disable"
        >
          Prix HT
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.amountDuttyFree`}
          disabled
          parse={value => Number(value)}
          className="form-create-invoice-field-disable"
        />
          
        <label
          htmlFor={`${product}.taxesAmount`}
          className="form-create-invoice-label-disable"
        >
          TVA
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.taxesAmount`}
          disabled
          parse={value => Number(value)}
          className="form-create-invoice-field-disable"
        />
        
        <label
          htmlFor={`${product}.amountAllTaxes`}
          className="form-create-invoice-label-disable"
        >
          Prix TTC
        </label>
        <Field
          component="input"
          type="number"
          name={`${product}.amountAllTaxes`}
          disabled
          parse={value => Number(value)}
          className="form-create-invoice-field-disable"
        />
        
        <button
          type="button"
          title="Remove Product"
          className="btn-remove"
          onClick={() => {
            console.log(index);
            console.log(this.props.fields.getAll());
            this.props.fields.remove(index);
          }}
        >
          <FaTrash className="trash-icon" />
        </button>
      </div>
    );
  }
}

ProductInvoiceItem.propTypes = {
  product: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  productSubmit: PropTypes.func.isRequired,
  changeAmounts: PropTypes.func.isRequired,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  quantity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  vatRate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  remise: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  fillPrice: PropTypes.func.isRequired,
};

ProductInvoiceItem.defaultProps = {
  price: 0,
  quantity: 0,
  remise: 0,
  vatRate: 0,
};

const selector = formValueSelector('facture');

const mapStateToProps = (state, ownProps) => ({
  price: selector(state, `${ownProps.product}.price`),
  quantity: selector(state, `${ownProps.product}.quantity`),
  remise: selector(state, `${ownProps.product}.remise`),
  vatRate: selector(state, `${ownProps.product}.vatRate`),
  remiseType: selector(state, `${ownProps.product}.remiseType`),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeAmounts: (amountProductRemise, prixHT, montantTVA, prixTTC) => {
    dispatch(change('facture', `${ownProps.product}.amountProductRemise`, amountProductRemise));
    dispatch(change('facture', `${ownProps.product}.amountDuttyFree`, prixHT));
    dispatch(change('facture', `${ownProps.product}.taxesAmount`, montantTVA));
    dispatch(change('facture', `${ownProps.product}.amountAllTaxes`, prixTTC));
  },
  selectProduct: (id, fieldName) => {
    dispatch(change('facture', `${fieldName}.product`, id));
  },
  fillPrice: (price, fieldName) => {
    dispatch(change('facture', `${fieldName}.price`, price));
  },  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'facture',
})(ProductInvoiceItem));
