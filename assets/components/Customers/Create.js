import React from 'react';
import PropTypes from 'prop-types';
import CreateClient from '~/components/Forms/customer/Create';
import axios from 'axios';

class Create extends React.Component {
  submit = (values) => {
    const { history } = this.props;
    axios.post('/api/customer/new', values)
      .then(() => {
        history.push('/customers');
      });
  }

  render() {
    return <CreateClient onSubmit={this.submit} />;
  }
}

Create.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Create;
