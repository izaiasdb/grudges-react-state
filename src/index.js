import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import { GrudgeProvider } from './GrudgeContext';

import './styles.css';

const rootElement = document.getElementById('root');

//ReactDOM.render(<Application />, rootElement);
ReactDOM.render(<GrudgeProvider><Application /></GrudgeProvider>, rootElement);

