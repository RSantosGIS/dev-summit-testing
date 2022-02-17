import React, {useEffect, useRef} from 'react';
import './SceneContainer.css';
import SceneView from '@arcgis/core/views/SceneView';
import EsriMap from '@arcgis/core/Map';
import Grid from '@material-ui/core/Grid';

export default function SceneContainer() {
  const sceneDiv = useRef(null);
  const distanceBtnRef = useRef(null);
  const areaBtnRef = useRef(null);
  const topBarRef = useRef(null);

  //initializes the 3D scene
  useEffect(() => {
    debugger;
    const map = new EsriMap({
      basemap: "topo-vector",
      ground: "world-elevation"
    });

    const view = new SceneView({
      container: sceneDiv.current,
      map: map,
      scale: 50000000,
      center: [-101.17, 21.78]
    });
    
  }, []);

  //in this particular demo we manually set the html elements for the widget containers
  return (
    <>


    <div id='sceneDiv' ref={sceneDiv}></div>

      {/* <div ref={topBarRef} className='topbar'>
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
        ></button>
      </div> */}
    </>
  )
}
