import React from 'react';
import ReactDOM from 'react-dom/client';

import MyComponent from './App';


const container: HTMLElement = document.getElementById('app')!  // ! supplied to enforce type (not null)
ReactDOM.createRoot(container).render(<div><MyComponent /></div>);