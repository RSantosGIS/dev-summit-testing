/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {container} = render(<App />);
  expect(container.firstChild).toHaveClass('App');
});
