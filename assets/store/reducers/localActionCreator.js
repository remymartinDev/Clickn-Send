import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_HOME,
  CLOSE_MODAL_HOME,
} from './localActions';

export const openModal = (view, field) => ({
  type: OPEN_MODAL,
  view,
  field,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openModalHome = () => ({
  type: OPEN_MODAL_HOME,
});

export const closeModalHome = () => ({
  type: CLOSE_MODAL_HOME,
});
