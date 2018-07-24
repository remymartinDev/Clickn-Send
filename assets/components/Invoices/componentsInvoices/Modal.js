import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { closeModal } from '~/store/reducers/localActionCreator';
import CreateCustomer from './CustomerCreate';
import CreateProduct from './ProductCreate';
import ShowInvoicePdf from './ShowInvoicePdf';
import ModalPaiement from './ModalPaiement';
import RecurredInvoicePdf from './RecurredInvoicePdf';

const ModalList = {
  customer: <CreateCustomer />,
  product: <CreateProduct />,
  show: <ShowInvoicePdf />,
  paiement: <ModalPaiement />,
  recurred: <RecurredInvoicePdf />,
};
class CustomeModal extends React.Component {
  componentDidMount() {
    if (this.props.modal) {
      this.props.closeModal();
    }
  }

  render() {
    const { modal, closeModal: close, Component } = this.props;
    return (
      <Modal isOpen={modal} toggle={() => {}} className="custom-modal">
        <ModalHeader toggle={close} />
        <ModalBody>
          {Component}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={close}>Fermer</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CustomeModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  Component: PropTypes.element,
};

CustomeModal.defaultProps = {
  Component: null,
};


const mapStateToProps = state => ({
  modal: state.notreReducer.modal,
  Component: ModalList[state.notreReducer.view],
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomeModal);
