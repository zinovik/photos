import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MainRouter } from './routers/MainRouter';
import { BackToTop } from './components/BackToTop';

export const App = () => {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="306312319198-u9h4e07khciuet8hnj00b8fvmq25rlj0.apps.googleusercontent.com">
        <Routes>
          <Route path="*" element={<MainRouter />} />
        </Routes>
        <BackToTop />
      </GoogleOAuthProvider>
    </div>
  );
};
