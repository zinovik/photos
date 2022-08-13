import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  const linkElement = screen.getByText(/gallery/i);
  expect(linkElement).toBeInTheDocument();
});
