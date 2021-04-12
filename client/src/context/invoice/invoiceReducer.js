import {
  ADD_INVOICE,
  DELETE_INVOICE,
  SET_INVOICE,
  UPDATE_INVOICE,
  NEW_INVOICE_FORM,
  INVOICE_DETAILS,
  GO_BACK,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return {
        ...state,
        newInvoiceForm: false,
        invoices: [...state.invoices, action.payload],
      };
    case NEW_INVOICE_FORM:
      return {
        ...state,
        newInvoiceForm: action.payload,
      };
    case INVOICE_DETAILS:
      return {
        ...state,
        invoiceDetails: action.payload,
      };
    case GO_BACK:
      return {
        ...state,
        invoiceDetails: action.payload,
      };
    default:
      return state;
  }
};
