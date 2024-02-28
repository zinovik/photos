import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MainRouter } from './routers/MainRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_OAUTH_PROVIDER_CLIENT_ID } from './constants';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<MainRouter />} />)
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_PROVIDER_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
