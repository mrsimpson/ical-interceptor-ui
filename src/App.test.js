import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Input form', () => {
  const { getByText } = render(<App />);
  const urlLabel = getByText(/ical-URL/i);
  expect(urlLabel).toBeInTheDocument();
});
