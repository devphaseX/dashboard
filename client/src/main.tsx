import ReactDom from 'react-dom/client';
import React from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import './styles/index.css';
import { store } from './store';

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
