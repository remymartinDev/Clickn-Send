import React from 'react';
import CreateClient from '~/components/Forms/customer/Create';
import axios from 'axios';

class Create extends React.Component {
  submit = (values) => {
    console.log(values);
    axios.post('/api/customer/new', values)
      .then((response) => {
        console.log(response.data);
      });
    this.props.history.push('/products');
  }

  render() {
    return <CreateClient onSubmit={this.submit} />;
  }
}

export default Create;
