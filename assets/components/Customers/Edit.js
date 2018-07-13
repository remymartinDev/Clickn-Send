import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EditForm from '~/containers/ClientEditContainer';

class Edit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/customer/${id}`)
      .then(({ data }) => {
        this.props.load(data);
      });
  }
  render() {
    return (
      <EditForm />
    );
  }
}

Edit.propTypes = {
  load: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  load: (data) => {
    dispatch({
      type: 'LOAD',
      data,
    });
  },
});

const EditContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);

export default EditContainer;
