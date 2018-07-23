import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Form from '~/components/Forms/Signup/Form';

const mapStateToProps = state => ({
  initialValues: state.notreReducer.userConnected,
  title: 'Editer votre compte',
});

const mapDispatchToProps = () => ({
  onSubmit: values => console.log(values),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'signup',
})(Form));
