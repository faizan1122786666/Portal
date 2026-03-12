/**
 * File: main.jsx
 * Description: Application entry point responsible for mounting the React application to the DOM and initializing core providers.
 * Why: To establish the root of the component tree and enable client-side routing via BrowserRouter.
 */
import { StrictMode } from 'react'
import  ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)



