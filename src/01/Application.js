//import React, { useState } from 'react';
import React, { useReducer } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const reducer = (state = [], action) => {
  return state;
};

const Application = () => {
  // const [grudges, setGrudges] = useState(initialState);
  const [grudges, dispatch] = useReducer(reducer, initialState);

  // const addGrudge = grudge => {
  //   grudge.id = id();
  //   grudge.forgiven = false;
  //   setGrudges([grudge, ...grudges]);
  // };

  const addGrudge = grudge => {
    grudge.id = id();
    grudge.forgiven = false;
    //setGrudges([grudge, ...grudges]);
  };  

  const toggleForgiveness = id => {
    setGrudges(
      grudges.map(grudge => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );
  };

  return (
    <div className="Application">
      <p>Reducer Action & State</p>
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
