import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeRouter } from './components/HomeRouter';
import { SectionRouter } from './components/SectionRouter';
import { BackToTop } from './components/BackToTop';
import './App.css';

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