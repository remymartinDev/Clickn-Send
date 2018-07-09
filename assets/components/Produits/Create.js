import React from 'react';
import CreateForm from '~/components/Forms/Produit/Create';
import axios from 'axios';

/* eslint-disable */
class Create extends React.Component {
  submit = values => {
    axios.post('/api/product/new', {...values, company: {id: 2}})
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    return <CreateForm onSubmit={this.submit} />
  }
}

export default Create;
