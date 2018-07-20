import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_HOME,
  CLOSE_MODAL_HOME,
  LOAD,
  LOGGED_OUT,
  LOGGED_IN,
  USER_CONNECTED,
  OPEN_PDF,
  OPEN_PAIEMENT,
} from './localActions';

export const openModal = (view, field) => ({
  type: OPEN_MODAL,
  view,
  field,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openModalHome = homeView => ({
  type: OPEN_MODAL_HOME,
  homeView,
});

export const closeModalHome = () => ({
  type: CLOSE_MODAL_HOME,
});

export const load = data => ({
  type: LOAD,
  data,
});

export const loggedIn = () => ({
  type: LOGGED_IN,
});

export const loggedOut = () => ({
  type: LOGGED_OUT,
});

export const userConnected = values => ({
  type: USER_CONNECTED,
  values,
});

export const openPdf = id => ({
  type: OPEN_PDF,
  view: 'show',
  id,
});
export const openPaiement = id => ({
  type: OPEN_PAIEMENT,
  view: 'paiement',
  id,
});
