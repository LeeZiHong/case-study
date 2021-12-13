import React, { useReducer, useContext, createContext } from "react";

const HistoryContext = createContext();
const HistoryDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <HistoryDispatchContext.Provider value={dispatch}>
      <HistoryContext.Provider value={state}>
        {children}
      </HistoryContext.Provider>
    </HistoryDispatchContext.Provider>
  );
};

export const useCHistory = () => useContext(HistoryContext);
export const useDisptachHistory = () => useContext(HistoryDispatchContext);
