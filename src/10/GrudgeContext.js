import React, { useReducer, createContext, useCallback } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';

export const GrudgeContext = createContext();

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';
const UNDO = 'UNDO';
const REDO = 'REDO';

const useUndoReducer = (reducer, initialState) => {
  const undoState = {
    past: [],
    present: initialState,
    future: []
  };

  const undoReducer = (state, action) => {
    const newPresent = reducer(state.present, action);

    if (action.type === 'UNDO') {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }

    if (action.type === 'REDO') {
      const [newPresent, ...newFuture] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  };

  return useReducer(undoReducer, undoState);
};

//const reducer = (state = [], action) => {
//const reducer = (state = defaultState, action) => {  
  const reducer = (state = initialState, action) => {    
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
      // const newPresent = [
      //   {
      //     id: id(),
      //     ...action.payload
      //   },
      //   ...state.present
      // ]

      // return {
      //   past: [state.present, ...state.past],
      //   present: newPresent,
      //   future: []
      // };
      return [
          {
            id: id(),
            ...action.payload
          },
          ...state
      ];      
    }    
  
    // if (action.type === GRUDGE_FORGIVE) {
    //   return state.map(grudge => {
    //     //if (grudge.id === id) return grudge;      
    //     if (grudge.id === action.payload.id) return grudge;      
    //     return { ...grudge, forgiven: !grudge.forgiven };
    //   });
    // }

    if (action.type === GRUDGE_FORGIVE) {
      // const newPresent = state.present.map(grudge => {
      //   if (grudge.id === action.payload.id) {
      //     return { ...grudge, forgiven: !grudge.forgiven };
      //   } 

      //   return grudge;      
      // });

      // return {
      //   past: [state.present, ...state.past],
      //   present: newPresent,
      //   future: []
      // };

      return state.map(grudge => {
        if (grudge.id === action.payload.id) {
          return { ...grudge, forgiven: !grudge.forgiven };
        } 

        return grudge;      
      });
    }    

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }

    if (action.type === REDO) {
      const [newPresent, ...newFuture] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture
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
  //const [state, dispatch] = useReducer(reducer, defaultState);
  const [state, dispatch] = useUndoReducer(reducer, initialState);
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

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, [dispatch]);  

  return (
    <GrudgeContext.Provider value={{ 
      grudges, 
      addGrudge, 
      toggleForgiveness, 
      undo, 
      redo, 
      isPast, 
      isFuture 
    }}>
      {children}
    </GrudgeContext.Provider>
  );
};