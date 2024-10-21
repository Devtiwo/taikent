import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import authReducer from "./Redux/authSlice.js";
import userReducer from "./Redux/userSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
)
