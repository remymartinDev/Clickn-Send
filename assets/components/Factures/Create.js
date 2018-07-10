import React from 'react';
import CreateFacture from '~/components/Forms/Facture/Create';
import axios from 'axios';

class Create extends React.Component {
  submit = (values) => {
    axios.post('/api/invoice/new', values)
      .then((response) => {
        console.log(response.data);
      });
  }

  render() {
    return <CreateFacture onSubmit={this.submit} />;
  }
}

export default Create;