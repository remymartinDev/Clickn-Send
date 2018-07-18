import React from 'react';
import PropTypes from 'prop-types';

import ButtonCreate from '~/components/ButtonCreate';
import CustomerItem from '~/containers/customers/CustomerItem';
import CustomerItemHead from './ComponentsCustomers/CustomerItemHead';

import './clients.scss';

class Home extends React.Component {
  state = {
    filter: {
      type: 'id',
      asc: false,
    },
  }

  componentDidMount() {
    this.props.loadCustomers();
  }

  getClientJSX = () => {
    const orderedCustomers = this.order();
    const clientJsx = orderedCustomers.map(customer => (
      <CustomerItem key={customer.id} {...customer} />
    ));
    return clientJsx;
  }

  handleChevron = type => () => {
    const { type: stateType, asc } = this.state.filter;
    this.setState({
      filter: {
        type,
        asc: type === stateType ? !asc : false,
      },
    });
  }

  orderById = () => (
    [...this.props.customers].sort((a, b) => {
      const filter = (b.id - a.id);
      return this.state.filter.asc ? filter : -filter;
    })
  )

  orderByPro = () => (
    [...this.props.customers].sort((a, b) => {
      const filter = (a.pro === b.pro) ? 0 : a.pro ? -1 : 1;
      return this.state.filter.asc ? filter : -filter;
    })
  )

  orderByRemise = () => {
    return (
      [...this.props.customers].sort((a, b) => {
        const filter = (b.remise - a.remise);
        return this.state.filter.asc ? filter : -filter;
      }));
  }

  orderByCountry = () => (
    [...this.props.customers].sort((a, b) => {
      const filter = b.countryCode.localeCompare(a.countryCode);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByName = () => (
    [...this.props.customers].sort((a, b) => {
      const nameA = a.pro ? a.customerCompany : a.lastname;
      const nameB = b.pro ? b.customerCompany : b.lastname;
      const filter = nameB.localeCompare(nameA);
      return this.state.filter.asc ? filter : -filter;
    })
  )

  order = () => {
    switch (this.state.filter.type) {
      case 'pro':
        return this.orderByPro();
      case 'nom':
        return this.orderByName();
      case 'remise':
        return this.orderByRemise();
      case 'pays':
        return this.orderByCountry();
      case 'id':
        return this.orderById();
      default:
        return this.props.customers;
    }
  }

  render() {
    return (
      <div className="page-container-clients">
        <h1 className="titre titl-clients">Vos clients</h1>
        <ButtonCreate class="clients-create-button list-cli-btn" type="client" />
        <div className="contain-clients">
          <CustomerItemHead clickChevron={this.handleChevron} />
          {this.getClientJSX()}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  customers: PropTypes.array.isRequired,
  loadCustomers: PropTypes.func.isRequired,
};

export default Home;
