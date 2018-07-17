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
    console.log(this.props);
    this.props.loadCustomers();
  }

  getClientJSX = () => {
    const orderedclient = [...this.props.customers].sort((a, b) => {
      const filter = b.id - a.id;
      return this.state.filter.asc ? filter : -filter;
    });
    const clientJsx = orderedclient.map(customer => (
      <CustomerItem key={customer.id} {...customer} />
    ));
    return clientJsx;
  }

  handleChevron = type => () => {
    console.log('je clique');
    const { type: stateType, asc } = this.state.filter;

    this.setState({
      filter: {
        type,
        asc: type === stateType ? !asc : false,
      },
    });
    this.order(this.props.customers, type);
  }

  orderByPro = client => (
    [...client].sort((a, b) => {
      const filter = (a === b) ? 0 : a? -1 : 1;
      console.log('je trie');
      console.log(filter);
      return this.state.filer.asc ? filter : -filter;
    })
  )

  orderByRemise = (client) => {
    console.log('je trie');
    return (
      [...client].sort((a, b) => {
        const filter = (b.price - a.price);
        return this.state.filer.asc ? filter : -filter;
      }));
  }

  orderByCountry = client => (
    [...client].sort((a, b) => {
      const filter = (b.unity - a.unity);
      console.log('je trie');
      return this.state.filer.asc ? filter : -filter;
    })
  )

  order = (client, type) => {
    console.log('j\'ordonne');
    switch (type) {
      case 'pro':
        return this.orderByPro(client);
      case 'nom':
        return this.orderByName(client);
      case 'prix':
        return this.orderByRemise(client);
      case 'pays':
        return this.orderByCountry(client);
      default:
        return client;
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
