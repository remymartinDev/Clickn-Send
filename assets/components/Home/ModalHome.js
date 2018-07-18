import React from 'react';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModalHome } from '~/store/reducers/localActionCreator';

import SignupForm from '~/components/Forms/Signup/SignupForm';
import LoginForm from '~/components/Forms/Login/LoginForm';

const ModalList = {
  signup: <SignupForm />,
  login: <LoginForm />,
};

const classList = {
  signup: 'signup-modal',
  login: 'login-modal',
};

class ModalHome extends React.Component {
  componentDidMount() {
    if (this.props.modalHome) {
      this.props.closeModalHome();
    }
  }

  render() {
    const { modalHome, closeModalHome: close, modalClass } = this.props;
    console.log(modalClass);
    return (
      <Modal isOpen={modalHome} toggle={() => {}} className={`custom-modal ${modalClass}`}>
        <ModalHeader toggle={close} />
        <ModalBody>
          {this.props.Component}
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
  modalClass: PropTypes.string.isRequired,
  Component: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
  ]).isRequired,
};

const mapStateToProps = state => ({
  modalHome: state.notreReducer.modalHome,
  Component: ModalList[state.notreReducer.homeView] || false,
  modalClass: classList[state.notreReducer.homeView] || '',
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ closeModalHome }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalHome);
