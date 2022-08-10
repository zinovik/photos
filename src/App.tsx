import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import SectionPage from './components/SectionPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path=":topLevelSection/*" element={<SectionPage />} />
      </Routes>
    </div>
  );
}

export default App;
