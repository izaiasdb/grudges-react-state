//import React, { useState } from 'react';
import React, { useCallback, useReducer } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state = [], action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      //if (grudge.id === id) return grudge;      
      if (grudge.id === action.payload.id) return grudge;      
      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }

  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  // const addGrudge = ({ person, reason }) => {
  //   dispatch({
  //     type: GRUDGE_ADD,
  //     payload: {
  //       person,
  //       reason,
  //       forgiven: false,
  //       id: id()
  //     }
  //   });
  // };  

  const addGrudge = useCallback(({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: id()
      }
    });
  }, [dispatch]);   

  // const toggleForgiveness = id => {
  //   // setGrudges(
  //   //   grudges.map(grudge => {
  //   //     if (grudge.id !== id) return grudge;
  //   //     return { ...grudge, forgiven: !grudge.forgiven };
  //   //   })
  //   // );
  // };

  // const toggleForgiveness = id => {
  //   dispatch({
  //     type: GRUDGE_FORGIVE,
  //     payload: { id }
  //   });
  // };  

  const toggleForgiveness = useCallback(id => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: { id }
    });
  }, [dispatch]);    

  return (
    <div className="Application">
      <p>React.memo & useCallback</p>
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
