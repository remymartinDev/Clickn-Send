import React from 'react';
import axios from 'axios';

import FactureItem from './componentsFactures/FactureItem';

// /api/factures

class Home extends React.Component {
  state = {
    factures: [],
  }

  componentDidMount() {
    axios.get('/api/factures')
      .then(({ data: factures }) => {
        this.setState({
          factures,
        });
      });
  }

  render() {
    const facturesJSX = this.state.factures.map(facture => <FactureItem key={facture.id} {...facture} />);
    return (
      <div>
        {facturesJSX}
      </div>
    );
  }
}

export default Home;
