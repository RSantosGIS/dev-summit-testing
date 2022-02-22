/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

const renderer = new ShallowRenderer();

//COMPONENT UNIT TESTS
test('renders App div', () => {
  renderer.render(<App />); //shallow render of just app component
  const view = renderer.getRenderOutput();
  expect(view.props.className).toEqual('App');
});

//COMPONENT INTEGRATION TESTS
test ('End to End app integration test', () => {
  render(<App/>); //full render of entire React component hierarchy
  let areaBtn = screen.getByRole('button', {name: /AreaButton/i});
  
  //click distance Button
  let classNames = areaBtn.className.split(' ');
  expect(classNames).not.toContainEqual('active');
  fireEvent.click(areaBtn);
  classNames = areaBtn.className.split(' ');
  expect(classNames).toContainEqual('active');
})
