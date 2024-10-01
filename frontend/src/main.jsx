import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom'
import store from './store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>


      <BrowserRouter>
        <App />

      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
