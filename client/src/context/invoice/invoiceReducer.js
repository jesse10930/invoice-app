import {
  ADD_INVOICE,
  DELETE_INVOICE,
  SET_INVOICE,
  UPDATE_INVOICE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    default:
      return state;
  }
};
