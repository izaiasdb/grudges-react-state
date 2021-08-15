//import React, { useState } from 'react';
import React, { useReducer } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

// const reducer = (state = [], action) => {
//   return state;
// };

const reducer = (state = [], action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }
  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  // const addGrudge = grudge => {
  //   grudge.id = id();
  //   grudge.forgiven = false;
  //   //setGrudges([grudge, ...grudges]);
  // };  

  const addGrudge = ({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: id()
      }
    });
  };  

  const toggleForgiveness = id => {
    // setGrudges(
    //   grudges.map(grudge => {
    //     if (grudge.id !== id) return grudge;
    //     return { ...grudge, forgiven: !grudge.forgiven };
    //   })
    // );
  };

  return (
    <div className="Application">
      <p>Reducer Action Keys & dispatch</p>
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
