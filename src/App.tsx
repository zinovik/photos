import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeRouter } from './routers/HomeRouter';
import { SectionRouter } from './routers/SectionRouter';
import { BackToTop } from './components/BackToTop';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<HomeRouter />} />
        <Route path=":section/*" element={<SectionRouter />} />
      </Routes>
      <BackToTop />
    </div>
  );
};
