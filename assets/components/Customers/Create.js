import React from 'react';
import CreateClient from '~/components/Forms/Client/Create';
import axios from 'axios';

class Create extends React.Component {
  submit = (values) => {
    axios.post('/api/customer/new', values)
      .then((response) => {
        console.log(response.data);
      });
  }

  render() {
    return <CreateClient onSubmit={this.submit} />;
  }
}

export default Create;
