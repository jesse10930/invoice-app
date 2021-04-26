import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { ALERT } from '../types';

const AlertState = (props) => {
  const initialState = {
    alert: false,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert State
  const setAlertState = () => {
    const newAlertState = true;
    dispatch({ type: ALERT, payload: newAlertState });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlertState,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
