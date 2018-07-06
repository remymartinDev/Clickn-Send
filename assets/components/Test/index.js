import React from 'react';
import axios from 'axios';

class Test extends React.Component {
  state = {
    response: null,
  }

  componentDidMount() {
    axios.get('/api/invoices')
      .then(({ data: factures }) => {
        // test pour envoie donnée
        const testFacture = { ...factures[0], id: null };
        console.log(testFacture);
        axios.post('/api/invoice/new', testFacture)
          .then((response) => {
            console.log(response);
          })
          .catch((response) => {
            console.log(response.response);
            this.setState({
              response: response.response.data,
            });
          });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{ __html: this.state.response }} />
      </React.Fragment>
    );
  }
}

export default Test;
