/* eslint-disable testing-library/no-node-access */
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

const renderer = new ShallowRenderer();
test('renders App div', () => {
  renderer.render(<App />);
  const view = renderer.getRenderOutput();
  expect(view.props.className).toEqual('App');
});
