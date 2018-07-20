import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faEllipsisV, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loadCustomers, loadInvoices, loadProducts } from '~/store/reducers/dataActionCreator';
import { openPdf } from '~/store/reducers/localActionCreator';

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

  render() {
    const { componentType, id, openModal } = this.props;

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
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadCustomers, loadInvoices, loadProducts }, dispatch),
  openModal: id => () => {
    dispatch(openPdf(id));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DropdownButton);
