import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Static Web App', () => {
  render(<App />);
  const element = screen.getByText(/Static Web App/i);
  expect(element).toBeInTheDocument();
});
