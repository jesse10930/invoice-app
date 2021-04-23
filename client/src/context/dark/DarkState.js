import React, { useReducer } from 'react';
import DarkContext from './darkContext';
import darkReducer from './darkReducer';
import { DARK } from '../types';

const DarkState = (props) => {
  const initialState = {
    dark: false,
  };

  const [state, dispatch] = useReducer(darkReducer, initialState);

  // Set Dark State
  const toggleDarkMode = () => {
    let newMode = !state.dark;
    dispatch({ type: DARK, payload: newMode });
  };

  return (
    <DarkContext.Provider
      value={{
        dark: state.dark,
        toggleDarkMode,
      }}
    >
      {props.children}
    </DarkContext.Provider>
  );
};

export default DarkState;
