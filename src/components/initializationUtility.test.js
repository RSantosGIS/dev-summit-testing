/* eslint-disable testing-library/no-node-access */
import initializationUtility from "./initializationUtility";
import { render, screen, fireEvent } from '@testing-library/react';

//test DOM
function TestBtnBarComponent() {
  return (
      <div id='topBar' className='topbar'>
        <button
          className="action-button esri-icon-measure-line"
          id = 'distanceBtn'
          type="button"
          title="Measure distance between two points"
          aria-label='DistanceButton'
        ></button>
        <button className="action-button esri-icon-measure-area" 
          id ='areaBtn'
          type="button" 
          title="Measure area"
          aria-label='AreaButton'
        ></button>
        <p>Hello!</p>
      </div>
  );
}

//COMPONENT UNIT TESTS
describe ("Init Utility Unit Tests", () => {

  beforeAll(() => {
    console.log("Done once before all tests in this 'Describe' suite.  Use for expensive setup like Async calls or objects that will NEVER be modified by a test");
  });

  beforeEach(() => {
    console.log("Done before each test in the suite.  Use for everything else so each test is encapsulated (ex: reset variables used for each test)");
  });
  
  test('Initialize Scene', () => {
    let {sceneRef} = render(<div id='sceneDiv' className='sceneDiv'></div>);
    let newSceneView = initializationUtility.initializeScene(sceneRef);
    expect(newSceneView).toBeDefined();
  });

  test('Set Active Button adds/removes active class', () => {
    render(<TestBtnBarComponent/>);
    let {sceneRef} = render(<div id='sceneDiv' className='sceneDiv'></div>);
    let sceneView = initializationUtility.initializeScene(sceneRef);
    let distanceBtn = screen.getByRole('button', {name: /DistanceButton/i});
    let areaBtn = screen.getByRole('button', {name: /AreaButton/i});
    expect(distanceBtn).toBeDefined();
    expect(areaBtn).toBeDefined();
    

    initializationUtility.setActiveButton(distanceBtn, sceneView);
    let classNames = distanceBtn.className.split(' ');
    expect(classNames).toContainEqual('active');

    initializationUtility.setActiveButton(areaBtn, sceneView);
    classNames = areaBtn.className.split(' ');
    expect(classNames).toContainEqual('active');
    classNames = distanceBtn.className.split(' ');
    expect(classNames).not.toContainEqual('active');
  });

  test('Button click event listeners toggle active Widget', () => {
    render(<TestBtnBarComponent/>);
    let {sceneRef} = render(<div id='sceneDiv' className='sceneDiv'></div>);
    let sceneView = initializationUtility.initializeScene(sceneRef);
    let distanceBtn = screen.getByRole('button', {name: /DistanceButton/i});
    let areaBtn = screen.getByRole('button', {name: /AreaButton/i});

    initializationUtility.initDistanceBtn(sceneView, distanceBtn, areaBtn);
    initializationUtility.initAreaBtn(sceneView, distanceBtn, areaBtn);

    //click distance Button
    let classNames = distanceBtn.className.split(' ');
    expect(classNames).not.toContainEqual('active');
    fireEvent.click(distanceBtn);
    classNames = distanceBtn.className.split(' ');
    expect(classNames).toContainEqual('active');

    //click area button
    classNames = areaBtn.className.split(' ');
    expect(classNames).not.toContainEqual('active');
    fireEvent.click(areaBtn);
    classNames = areaBtn.className.split(' ');
    expect(classNames).toContainEqual('active');
    classNames = distanceBtn.className.split(' ');
    expect(classNames).not.toContainEqual('active');
  });
});