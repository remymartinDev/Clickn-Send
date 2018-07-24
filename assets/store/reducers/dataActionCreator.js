import {
  LOAD_CUSTOMERS,
  LOAD_PRODUCTS,
  LOAD_STATUS,
  LOAD_INVOICES,
  LOAD_ALL_DATA,
  DELETE_CUSTOMER,
  CREATE_INVOICE,
  CREATE_CUSTOMER,
  ADD_CUSTOMER,
  CREATE_PRODUCT,
  ADD_PRODUCT,
  CREATE_COMPANY,
} from './dataActions';

export const loadCustomers = () => ({
  type: LOAD_CUSTOMERS,
});

export const loadProducts = () => ({
  type: LOAD_PRODUCTS,
});

export const loadStatus = () => ({
  type: LOAD_STATUS,
});

export const loadInvoices = () => ({
  type: LOAD_INVOICES,
});

export const loadAllData = () => ({
  type: LOAD_ALL_DATA,
});

export const deleteCustomer = id => ({
  type: DELETE_CUSTOMER,
  id,
});

export const createInvoice = values => ({
  type: CREATE_INVOICE,
  values,
});

export const createCustomer = values => ({
  type: CREATE_CUSTOMER,
  values,
});

export const addCustomer = customer => ({
  type: ADD_CUSTOMER,
  customer,
});

export const createProduct = values => ({
  type: CREATE_PRODUCT,
  values,
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
});

export const createCompany = values => ({
  type: CREATE_COMPANY,
  values,
});

