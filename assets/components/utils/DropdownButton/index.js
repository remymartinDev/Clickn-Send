import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faEllipsisV, faDownload, faHandHoldingUsd, faCopy, faShareSquare, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loadCustomers, loadInvoices, loadProducts } from '~/store/reducers/dataActionCreator';
import { openPdf, openPaiement, openRecurred } from '~/store/reducers/localActionCreator';

import './dropdownButton.scss';

class DropdownButton extends React.Component {
  state = {
    dropdownOpen: false,
  }

  getStatusJSX = () => {
    const statusArray = [
      'facture',
      'facture récurrente',
      'brouillon',
      'devis',
      'devis refusé',
    ];
    const statusJSX = statusArray.filter(status => status !== this.props.invoiceType)
      .map(status => (
        <DropdownItem key={status} onClick={this.handleStatusChange(status)}>{status}</DropdownItem>
      ));
    return statusJSX;
  }

  handleStatusChange = status => () => {
    const { id } = this.props;
    axios.post(`/api/admin/invoice/${id}/edit`, { status })
      .then(() => {
        this.props.loadInvoices();
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

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  loadAction = () => {
    const loadList = {
      invoice: this.props.loadInvoices,
      product: this.props.loadProducts,
      customer: this.props.loadCustomers,
    };
    loadList[this.props.componentType]();
  }

  handleDeletePayment = () => {
    const {
      componentType,
      id,
      invoiceId,
      load,
    } = this.props;
    axios.delete(`/api/${componentType}/${id}`)
      .then((response) => {
        if (response.data.succes) {
          axios.get(`/api/payments/${invoiceId}`)
            .then(() => {
              load();
            });
        }
      });
  }
  removeHandler = () => {
    const { id, componentType } = this.props;
    switch (componentType) {
      case 'invoice': {
        axios.delete(`/api/invoice/${id}`)
          .then(() => {
            this.props.loadInvoices();
          });
        break;
      }
      case 'customer': {
        axios.delete(`/api/admin/customer/${id}/delete`)
          .then(() => {
            this.props.loadCustomers();
          });
        break;
      }
      default: {
        break;
      }
    }
  }

  reccuredHandle = () => {
    axios.post(`/api/invoice/${this.props.id}/recurred`)
      .then((response) => {
        this.props.loadInvoices();
        this.props.openRecurred(response.data);
      });
  }

  render() {
    const {
      componentType,
      id,
      openModal,
      openModalPaiement,
      invoiceType,
      isAdmin,
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
            (componentType === 'invoice' && invoiceType === 'facture récurrente')
            &&
            <DropdownItem className="dropdown-box">
              <div onClick={this.reccuredHandle} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faShareSquare} />
                 Envoyer
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
          {
            (invoiceType !== 'facture' && invoiceType !== 'facture récurrente' && componentType !== 'payment') &&
            <DropdownItem className="dropdown-box">
              <Link to={`/${componentType}s/${id}/edit`} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faPencilAlt} />
                Editer
              </Link>
            </DropdownItem>
          }
          {
            (invoiceType !== 'facture récurrente' && componentType === 'facture') &&
            <DropdownItem className="dropdown-box">
              <Link to={`/${componentType}s/${id}/copy`} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faCopy} />
                Duppliquer
              </Link>
            </DropdownItem>
          }
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
            (invoiceType !== 'facture' && invoiceType !== 'facture récurrente' && componentType !== 'payment') &&
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
          {
            (isAdmin && invoiceType !== 'facture' && invoiceType !== 'facture récurrente' && (componentType === 'invoice' || componentType === 'customer')) &&
            <DropdownItem
              onClick={this.removeHandler}
              className="dropdown-link dropdown-box"
            >
              <FontAwesomeIcon
                className="dropdown-link-icon"
                icon={faEraser}
              />
                Supprimer
            </DropdownItem>
          }
          {
            (isAdmin && componentType === 'invoice') &&
            <UncontrolledDropdown direction="right" className="subdropdown" style={{}}>
              <DropdownToggle caret>
                Changer Status
              </DropdownToggle>
              <DropdownMenu>
                {this.getStatusJSX()}
              </DropdownMenu>
            </UncontrolledDropdown>
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
  openRecurred: PropTypes.func.isRequired,
  invoiceType: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  invoiceId: PropTypes.number,
  load: PropTypes.func,
};

DropdownButton.defaultProps = {
  invoiceType: '',
  invoiceId: 0,
  load: () => {},
};

const mapStateToProps = state => ({
  isAdmin: (state.notreReducer.userConnected.roles.find(role => role === 'ROLE_ADMIN')) ? true : false,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadCustomers, loadInvoices, loadProducts, openRecurred }, dispatch),
  openModal: id => () => {
    dispatch(openPdf(id));
  },
  openModalPaiement: id => () => {
    dispatch(openPaiement(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownButton);
