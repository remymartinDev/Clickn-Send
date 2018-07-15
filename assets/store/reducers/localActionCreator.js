import { OPEN_MODAL, CLOSE_MODAL } from './localActions';

export const openModal = (view, field) => ({
  type: OPEN_MODAL,
  view,
  field,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
