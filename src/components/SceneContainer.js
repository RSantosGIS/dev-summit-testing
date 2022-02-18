import React, {useEffect, useRef} from 'react';
import './SceneContainer.css';
import initializationUtility from './initializationUtility';


export default function SceneContainer() {
  const sceneDiv = useRef(null);
  const distanceBtnRef = useRef(null);
  const areaBtnRef = useRef(null);
  const topBarRef = useRef(null);

  //initializes the 3D scene
  useEffect(() => {
    let scene = initializationUtility.initializeScene(sceneDiv.current);
    initializationUtility.initWidgets(scene, topBarRef.current, distanceBtnRef.current, areaBtnRef.current);
  }, []);

  //in this particular demo we manually set the html elements for the widget containers
  return (
    <>
    <div id='sceneDiv' ref={sceneDiv} className='sceneDiv'></div>
    <div ref={topBarRef} className='topbar'>
      <button
        className="action-button esri-icon-measure-line"
        ref={distanceBtnRef}
        type="button"
        title="Measure distance between two points"
      ></button>
      <button className="action-button esri-icon-measure-area" 
        ref ={areaBtnRef}
        type="button" 
        title="Measure area"
        aria-label='AreaButton'
      ></button>
    </div>
    </>
  )
}
