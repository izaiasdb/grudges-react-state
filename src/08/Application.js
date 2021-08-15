import React from 'react';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  // const {undo, isPast }
  return (
    <div className="Application">      
      <p>Implementing Undo & Redo</p>
      <NewGrudge />
      <section>
        <button>
          Undo
        </button>
        <button>
          Redo
        </button>        
      </section>
      <Grudges />
    </div>
  );
};

export default Application;
