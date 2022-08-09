import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path=":category/*" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
