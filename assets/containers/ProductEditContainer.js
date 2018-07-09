import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Form from '~/components/Produits/ComponentsProducts/Form';

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

const EditForm = reduxForm({
  form: 'produit',
  enableReinitialize: true,
})(Form);

const EditFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);

export default EditFormContainer;
