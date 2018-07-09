import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import EditForm from '~/containers/ProductEditContainer';

class Edit extends React.Component {
  state = {
    data: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    console.log(this.props);
    axios.get(`/api/product/${id}`)
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
const mapStateToProps = state => ({
  initialValues: state.notreReducer.data,
});
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
)(Edit)
export default EditContainer;
