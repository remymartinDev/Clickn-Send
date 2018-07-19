import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faCopy, faEllipsisV, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loadCustomers, loadInvoices, loadProducts } from '~/store/reducers/dataActionCreator';

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
    const { componentType, id } = this.props;
    axios.post(`/api/${componentType}/${id}/activ`)
      .then((response) => {
        console.log(response);
        if (response.data.succes) {
          this.loadAction();
        }
      });
  }

  render() {
    const { componentType, id } = this.props;

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
              <Link to={`/${componentType}/${id}/pdfShow`} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faEye} />
                 Voir
              </Link>
            </DropdownItem>
          }
          {
            (componentType === 'product' || componentType === 'customer')
            &&
            <DropdownItem className="dropdown-box">
              <Link to={`/${componentType}/${id}`} className="dropdown-link">
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
              <Link to={`/${componentType}/${id}/pdfdownload`} className="dropdown-link">
                <FontAwesomeIcon className="dropdown-link-icon" icon={faDownload} />
                 Télécharger
              </Link>
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
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadCustomers, loadInvoices, loadProducts }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(DropdownButton);
