import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { closeModal } from '~/store/reducers/localActionCreator';
import CreateCustomer from './CustomerCreate';
import CreateProduct from './ProductCreate';

// const CustomeModal = ({ modal }) => (
//   <Modal isOpen={modal} toggle={this.toggle} className="custom-modal">
//     <ModalHeader toggle={this.toggle}>Créer votre client</ModalHeader>
//     <ModalBody>
//       <CreateClient onSubmit={this.customerSubmit} />
//     </ModalBody>
//     <ModalFooter>
//       <Button color="secondary" onClick={this.toggle}>Annuler</Button>
//     </ModalFooter>
//   </Modal>
// );

const ModalList = {
  customer: <CreateCustomer />,
  product: <CreateProduct />,
};

const CustomeModal = ({ modal, closeModal: close, Component }) => (
  <Modal isOpen={modal} toggle={() => {}} className="custom-modal">
    <ModalHeader toggle={close} />
    <ModalBody>
      {Component}
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={close}>Annuler</Button>
    </ModalFooter>
  </Modal>
);

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
