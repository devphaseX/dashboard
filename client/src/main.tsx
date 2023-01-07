import ReactDom from 'react-dom/client';
import React from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as globalSharedStateReducer } from './store/global';
import './styles/index.css';

const store = configureStore({ reducer: { global: globalSharedStateReducer } });

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
