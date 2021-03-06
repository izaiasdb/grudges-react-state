import React, { useReducer, createContext, useCallback } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';

export const GrudgeContext = createContext();

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';
const UNDO = 'UNDO';

//const reducer = (state = [], action) => {
  const reducer = (state = defaultState, action) => {  
    // if (action.type === GRUDGE_ADD) {
    //   return [action.payload, ...state];
    // }
    // if (action.type === GRUDGE_ADD) {
    //   return [
    //     {
    //       id: id(),
    //       ...action.payload
    //     },
    //     ...state
    //   ];
    // }    

    if (action.type === GRUDGE_ADD) {
      const newPresent = [
        {
          id: id(),
          ...action.payload
        },
        ...state.present
      ]

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: []
      };
    }    
  
    // if (action.type === GRUDGE_FORGIVE) {
    //   return state.map(grudge => {
    //     //if (grudge.id === id) return grudge;      
    //     if (grudge.id === action.payload.id) return grudge;      
    //     return { ...grudge, forgiven: !grudge.forgiven };
    //   });
    // }

    if (action.type === GRUDGE_FORGIVE) {
      const newPresent = state.present.map(grudge => {
        if (grudge.id === action.payload.id) {
          return { ...grudge, forgiven: !grudge.forgiven };
        } 

        return grudge;      
      });

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: []
      };
    }    

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }
  
    return state;
};

const defaultState = {
  past: [],
  present: initialState,
  future: []
};

export const GrudgeProvider = ({ children }) => {
  //const [grudges, dispatch] = useReducer(reducer, initialState);
  //const [grudges, dispatch] = useReducer(reducer, defaultState);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const grudges = state.present;
  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;

  const addGrudge = useCallback(({ person, reason }) => {
    // dispatch({
    //   type: GRUDGE_ADD,
    //   payload: {
    //     person,
    //     reason,
    //     forgiven: false,
    //     id: id()
    //   }
    // });
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
      }
    });    
  }, [dispatch]);     

  const toggleForgiveness = useCallback(id => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: { id }
    });
  }, [dispatch]);  

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);

  return (
    <GrudgeContext.Provider value={{ grudges, addGrudge, toggleForgiveness, undo, isPast, isFuture }}>
      {children}
    </GrudgeContext.Provider>
  );
};