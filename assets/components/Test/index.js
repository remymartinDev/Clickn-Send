import React from 'react';
import axios from 'axios';

class Test extends React.Component {
  state = {
    response: null,
  }

  componentDidMount() {
    axios.delete('/api/invoices/2')
      .then(({ data: factures }) => {
        // test pour envoie donnée
        console.log(factures);
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
