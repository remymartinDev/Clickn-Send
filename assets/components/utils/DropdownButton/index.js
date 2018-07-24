import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faEllipsisV, faDownload, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loadCustomers, loadInvoices, loadProducts } from '~/store/reducers/dataActionCreator';
import { openPdf, openPaiement } from '~/store/reducers/localActionCreator';

import './dropdownButton.scss';

class DropdownButton extends React.Component {
  state = {
    dropdownOpen: false,
  }

  loadAction = () => {
    const loadList = {
      invoice: this.props.loadInvoices,
      product: this.props.loadProducts,
      customer: this.props.loadCustomers,
    };
    loadList[this.props.componentType]();
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleDelete = () => {
    const { componentType, id } = this.props;
    axios.post(`/api/${componentType}/${id}/activ`)
      .then((response) => {
        if (response.data.succes) {
          this.loadAction();
        }
      });
  }

  handleDeletePayment = () => {
    const { componentType, id, invoiceId, load } = this.props;
    axios.delete(`/api/${componentType}/${id}`)
      .then((response) => {
        if (response.data.succes) {
          axios.get(`/api/payments/${invoiceId}`)
            .then((response) => {
              load();
            });
        }
      });
  }

  render() {
    const {
      componentType,
      id,
      openModal,
      openModalPaiement,
      invoiceType,
    } = this.props;

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="dropdown-btn">
          <FontAwesomeIcon icon={faEllipsisV} />
        </DropdownToggle>
        <DropdownMenu>
          {
            componentType === 'invoice'
            &&
            <DropdownItem className="dropdown-box">
              <div onClick={openModal(id)} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faEye} />
                 Voir
              </div>
            </DropdownItem>
          }
          {
            (componentType === 'product' || componentType === 'customer')
            &&
            <DropdownItem className="dropdown-box">
              <Link to={`/${componentType}s/${id}`} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faEye} />
                 Voir
              </Link>
            </DropdownItem>
          }
          <DropdownItem className="dropdown-box">
            <Link to={`/${componentType}s/${id}/edit`} className="dropdown-link">
              <FontAwesomeIcon className="dropdown-link-icon" icon={faPencilAlt} />
               Editer
            </Link>
          </DropdownItem>
          {
            componentType === 'invoice'
            &&
            <DropdownItem className="dropdown-box">
              <a href={`/${componentType}/${id}/pdfdownload`} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faDownload} />
                 Télécharger
              </a>
            </DropdownItem>
          }
          {
            componentType === 'invoice'
            &&
            <DropdownItem className="dropdown-box">
              <div onClick={openModalPaiement(id)} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faHandHoldingUsd} />
                 Paiement reçu
              </div>
            </DropdownItem>
          }
          {
            componentType === 'payment'
            &&
            <DropdownItem
              onClick={this.handleDeletePayment}
              className="dropdown-link dropdown-box"
            >
              <FontAwesomeIcon
                className="dropdown-link-icon"
                icon={faTrashAlt}
              />
                Effacer
            </DropdownItem>
          }
          {
            (invoiceType !== 'facture' && invoiceType !== 'facture récurrente' && componentType !== 'payment' ) &&
            <DropdownItem
              onClick={this.handleDelete}
              className="dropdown-link dropdown-box"
            >
              <FontAwesomeIcon
                className="dropdown-link-icon"
                icon={faTrashAlt}
              />
                Archiver
            </DropdownItem>
          }
          
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

DropdownButton.propTypes = {
  componentType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  loadInvoices: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadCustomers: PropTypes.func.isRequired,
  openModalPaiement: PropTypes.func.isRequired,
  invoiceType: PropTypes.string,
};

DropdownButton.defaultProps = {
  invoiceType: '',
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadCustomers, loadInvoices, loadProducts }, dispatch),
  openModal: id => () => {
    dispatch(openPdf(id));
  },
  openModalPaiement: id => () => {
    dispatch(openPaiement(id));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DropdownButton);
