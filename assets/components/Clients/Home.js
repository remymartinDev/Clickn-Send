import React from 'react';
import axios from 'axios';

import ButtonCreate from '~/components/ButtonCreate';
import ProductItem from './ComponentsClients/ClientItem';
import ProductItemHead from './ComponentsClients/ClientItemHead';

import './clients.scss';

class Home extends React.Component {
  state = {
    client: [],
    filter: {
      type: 'id',
      asc: false,
    }
  }

  componentDidMount() {
    axios.get('/api/customers')
      .then(({ data: client }) => {
        console.log(client);
        this.setState({
          client,
        });
      });
  }

  getClientJSX = () => {
    const orderedclient = [...this.state.client].sort((a, b) => {
      const filter = b.id - a.id;
      return this.state.filter.asc ? filter : -filter;
    });
    const clientJsx = orderedclient.map(product => (
      <ProductItem key={product.id} {...product} />
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

   
  orderByPrice = client => (
    [...client].sort((a, b) => {
      const filter = (b.price - a.price);
      return this.state.filer.asc ? filter : -filter;
    })
  )
  orderByUnity = client => (
    [...client].sort((a, b) => {
      const filter = (b.unity - a.unity);
      return this.state.filer.asc ? filter : -filter;
    })
  )

  order = (client, type) => {
    switch (type) {
      case 'pro':
        return this.orderByPro(client);
      case 'nom':
        return this.orderByName(client);
      case 'prix':
        return this.orderByPrice(client);
      case 'unite':
        return this.orderByUnity(client);
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
          <ProductItemHead clickChevron={this.handleChevron} />
          {this.getClientJSX()}
        </div>
      </div>
    );
  }
}

export default Home;
