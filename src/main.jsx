import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

import App from './App.jsx'
import {Provider} from 'react-redux'
import fdStore from './Redux/fdStore.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={fdStore}> 
   <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
