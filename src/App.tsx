import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { SectionPage } from './components/SectionPage';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path=":section/*" element={<SectionPage />} />
      </Routes>
    </div>
  );
};
