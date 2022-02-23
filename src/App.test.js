/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import App from './App';

const shallowRenderer = new ShallowRenderer();

//COMPONENT UNIT TESTS
describe ("App component unit tests", () => {
  test('renders App div', () => {
    shallowRenderer.render(<App />); //shallow render of just app component
    const view = shallowRenderer.getRenderOutput();
    expect(view.props.className).toEqual('App');
  });
});

//COMPONENT INTEGRATION AND SNAPSHOT TESTS
describe ("App wide integration and snapshot tests", () => {

  test ('ArcGIS integration connectivity', async () => {
    const response = await fetch('https://www.arcgis.com/sharing/rest/content/items/b6c889ff1f684cd7a65301984b80b93d?f=json', {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const jsonBody = await response.json();
    expect(jsonBody.id).toEqual('b6c889ff1f684cd7a65301984b80b93d');
    expect(jsonBody.type).toEqual('Web Scene');
  });

  it ('Matches snapshot', () => {
    const htmlTree = renderer.create(<App/>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  test ('End to End app integration and functionality test', () => {
    render(<App/>); //full render of entire React component hierarchy
    let areaBtn = screen.getByRole('button', {name: /AreaButton/i});
    
    //click distance Button
    let classNames = areaBtn.className.split(' ');
    expect(classNames).not.toContainEqual('active');
    fireEvent.click(areaBtn);
    classNames = areaBtn.className.split(' ');
    expect(classNames).toContainEqual('active');
  });
});

