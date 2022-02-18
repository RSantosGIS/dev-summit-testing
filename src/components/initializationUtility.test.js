/* eslint-disable testing-library/no-node-access */
import initializationUtility from "./initializationUtility";
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/react/dont-cleanup-after-each";

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
  //variables needed for every test
  let sceneView = null;

  afterAll(() => {
    cleanup();
  });
  
  test('Initialize Scene', () => {
    let {sceneRef} = render(<div id='sceneDiv' className='sceneDiv'></div>);
    sceneView = initializationUtility.initializeScene(sceneRef);
    expect(sceneView).toBeDefined();
  });

  test('Button event listeners toggle active button', () => {
    render(<TestBtnBarComponent/>);
    let distanceBtn = screen.getByRole('button', {name: /DistanceButton/i});
    let areaBtn = screen.getByRole('button', {name: /AreaButton/i});
    expect(distanceBtn).toBeDefined();
    expect(areaBtn).toBeDefined();

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