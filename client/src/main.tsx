import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/state/api';

export const store = configureStore({
  reducer: {[api.reducerPath]: api.reducer},
  middleware: (getDefualt) => getDefualt().concat(api.middleware),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
