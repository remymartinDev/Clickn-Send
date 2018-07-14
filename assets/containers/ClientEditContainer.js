import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import Form from '~/components/Customers/ComponentsCustomers/Form';

const mapStateToProps = state => ({
  initialValues: state.notreReducer.data,
});

const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    console.log('data', values);
    axios.post(`/api/customer/${values.id}/edit`, values)
      .then((response) => {
        console.log(response);
      });
  },
});

const EditForm = reduxForm({
  form: 'client',
  enableReinitialize: true,
})(Form);

const EditFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);

export default EditFormContainer;
