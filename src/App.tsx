import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainRouter } from './routers/MainRouter';
import { BackToTop } from './components/BackToTop';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<MainRouter />} />
      </Routes>
      <BackToTop />
    </div>
  );
};
