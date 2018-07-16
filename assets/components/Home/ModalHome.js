import React from 'react';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModalHome } from '~/store/reducers/localActionCreator';

import SigninForm from './SigninForm';

class ModalHome extends React.Component {
  componentDidMount() {
    if (this.props.modalHome) {
      this.props.closeModalHome();
    }
  }

  render() {
    const { modalHome, closeModalHome: close } = this.props;
    return (
      <Modal isOpen={modalHome} toggle={() => {}} className="custom-modal">
        <ModalHeader toggle={close} />
        <ModalBody>
          <SigninForm />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={close}>Annuler</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalHome.propTypes = {
  modalHome: PropTypes.bool.isRequired,
  closeModalHome: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalHome: state.notreReducer.modalHome,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ closeModalHome }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalHome);
