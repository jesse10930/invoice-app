import {
  ADD_INVOICE,
  NEW_INVOICE_FORM,
  INVOICE_DETAILS,
  GO_BACK,
  DELETE_CONFIRMATION,
  EDIT_INVOICE_FORM,
  DISCARD,
  FILTER_INVOICES,
} from '../types';

const invoiceReducer = (state, action) => {
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
        currentUser: action.payload,
        invoiceDetails: true,
      };
    case GO_BACK:
      return {
        ...state,
        currentUser: null,
        invoiceDetails: false,
        filters: action.payload,
      };
    case EDIT_INVOICE_FORM:
      return {
        ...state,
        editInvoiceForm: action.payload,
      };
    case DELETE_CONFIRMATION:
      return {
        ...state,
        deleteConfirmation: action.payload,
      };
    case DISCARD:
      return {
        ...state,
        newInvoiceForm: action.payload,
      };
    case FILTER_INVOICES:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
