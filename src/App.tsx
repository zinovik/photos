import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeRouter } from './routers/HomeRouter';
import { AlbumRouter } from './routers/AlbumRouter';
import { BackToTop } from './components/BackToTop';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<HomeRouter />} />
        <Route path=":album/*" element={<AlbumRouter />} />
      </Routes>
      <BackToTop />
    </div>
  );
};
