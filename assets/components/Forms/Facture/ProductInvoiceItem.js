import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FaTrash from 'react-icons/lib/fa/trash';

import CreateProduct from '~/components/Forms/Produit/Create';
import Loading from '~/components/utils/Loading';

class ProductInvoiceItem extends React.Component {
  state = {
    modal: false,
    price: 0,        
  }

  getProductsJSX = () => (
    this.props.products.map(product => (
      <option key={product.id} value={product.id} >{product.denomination}</option>
    ))
  )

  productSubmit = fieldName => (values) => {
    this.props.productSubmit(fieldName, values, this.toggle);
    console.log('productSubmit', fieldName, values);
    this.setState({
      price: values.price,
    });
  }
  handleChange = fieldName => (e) => {
    this.props.fillPrice(e.target.value, fieldName);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { product, index } = this.props;
    return (
      <div className="add-product-select">
        <div className="add-product-select-product">
          <Field component="select" name={`${product}.product`} className="fieldSelect" onChange={this.handleChange(`${product}.price`)}>
            <option>Sélectionner votre produit</option>
            {this.getProductsJSX()}
          </Field>
          <Button onClick={this.toggle} className="modal-button">
            <FontAwesomeIcon className="modal-icon" icon={faPlus} />
          </Button>
          {this.props.loading && <Loading />}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Créer votre produit</ModalHeader>
          <ModalBody>
            <CreateProduct onSubmit={this.productSubmit(`${product}.product`)} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <label htmlFor={`${product}.price`}>Prix</label>
        <Field component="input" type="text" name={`${product}.price`} />

        <label htmlFor={`${product}.quantity`}>Quantité</label>
        <Field component="input" type="text" name={`${product}.quantity`} />
        <label htmlFor={`${product}.vatRate`}>Taux de TVA</label>
        <Field component="input" type="text" name={`${product}.vatRate`} />
        <label htmlFor={`${product}.remise`}>Remise</label>
        <Field component="input" type="text" name={`${product}.remise`} />
        <label htmlFor={`${product}.amountDuttyFree`}>Prix HT</label>
        <Field component="input" type="text" name={`${product}.amountDuttyFree`} />
        <label htmlFor={`${product}.taxesAmount`}>TVA</label>
        <Field component="input" type="text" name={`${product}.taxesAmount`} />
        <label htmlFor={`${product}.amountAllTaxes`}>Prix TTC</label>
        <Field component="input" type="text" name={`${product}.amountAllTaxes`} />
        <button
          type="button"
          title="Remove Product"
          className="btn-remove"
          onClick={() => this.props.fields.remove(index)}
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
};

export default connect(
  null,
  null,
)(reduxForm({
  form: 'facture',
})(ProductInvoiceItem));
// export default connect(
//   null,
//   null,
// )(reduxForm({
//   form: 'facture',
// }))(ProductInvoiceItem);
