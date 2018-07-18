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

class DropdownButton extends React.Component {
  state = {
    dropdownOpen: false,
  }

  getLoadAction = () => {
    const loadList = {
      invoice: loadInvoices,
      product: loadProducts,
      customer: loadCustomers,
    };
    return loadList[this.props.componentType];
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  handleDelete = () => {
    const { componentType, id, componentObject } = this.props;
    console.log('avant', componentObject);
    const newObject = { ...componentObject, active: false };
    console.log('après', newObject);
    axios.post(`/api/${componentType}/${id}/edit`, newObject)
      .then((response) => {
        console.log(response);
        if (response.data.succes) {
          this.getLoadAction();
        }
      });
  }

  render() {
    const { componentType, id, componentObject } = this.props;

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>
          <FontAwesomeIcon className="list-item--icon" icon={faEllipsisV} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link to="/customers" className="list-item--icon">
              <FontAwesomeIcon className="list-item--icon" icon={faEye} />
               Voir
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={`/${componentType}s/${id}`} className="list-item--icon">
              <FontAwesomeIcon className="list-item--icon" icon={faPencilAlt} />
               Editer
            </Link>
          </DropdownItem>
          {
            componentType === 'invoice'
            &&
            <DropdownItem>
              <Link to={`/${componentType}/${id}/pdf`} className="list-item--icon">
                <FontAwesomeIcon className="list-item--icon" icon={faDownload} />
                 Télécharger
              </Link>
            </DropdownItem>
          }
          <DropdownItem
            onClick={this.handleDelete}
          >
            <FontAwesomeIcon
              className="list-item--icon"
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
  componentObject: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadCustomers, loadInvoices, loadProducts }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(DropdownButton);
