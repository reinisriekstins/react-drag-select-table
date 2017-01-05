import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { store } from './store'

import './foundation.css'
import './index.css'

window.store = store

ReactDOM.render(
  <div className="row">
    <App store={ store } />
  </div>,
  document.getElementById('root')
)
