import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import rootReducer from "./store";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = configureStore({reducer: rootReducer}); 

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
