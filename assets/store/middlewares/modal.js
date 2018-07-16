import { CREATE_CUSTOMER, CREATE_PRODUCT } from '~/store/reducers/dataActions';
import { closeModal } from '~/store/reducers/localActionCreator';
import { addCustomer, addProduct } from '~/store/reducers/dataActionCreator';
import { change } from 'redux-form';
import { ajaxGet } from '~/components/utils/ajax';

const modalMiddleware = store => next => async (action) => {
  const state = store.getState();
  switch (action.type) {
    case CREATE_CUSTOMER:
      if (state.notreReducer.modal) {
        const response = await ajaxGet(`/api/customer/${action.id}`);
        const customer = response.data;
        store.dispatch(addCustomer(customer));
        store.dispatch(change('facture', state.notreReducer.field, customer.id));
        store.dispatch(change('facture', 'remise', customer.remise));
        store.dispatch(closeModal());
      }
      break;
    case CREATE_PRODUCT: {
      if (state.notreReducer.modal) {
        const response = await ajaxGet(`/api/product/${action.id}`);
        const product = response.data;
        store.dispatch(addProduct(product));
        store.dispatch(change('facture', `${state.notreReducer.field}.product`, product.id));
        store.dispatch(change('facture', `${state.notreReducer.field}.price`, product.price));
        store.dispatch(closeModal());
      }
      break;
    }
    default:
      next(action);
  }
};

export default modalMiddleware;
