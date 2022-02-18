/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import SceneContainer from './SceneContainer';

//COMPONENT UNIT TESTS
test('Smoke Test: Render Scene Container div', () => {
  const {container} = render(<SceneContainer />);
  expect(container.firstChild).toHaveClass('sceneDiv');
  expect(screen.getByRole('button', {name: /AreaButton/i})).toBeDefined();
});

