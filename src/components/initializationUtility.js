import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import DirectLineMeasurement3D from '@arcgis/core/widgets/DirectLineMeasurement3D';
import AreaMeasurement3D from '@arcgis/core/widgets/AreaMeasurement3D';

const initializationUtility = {
  initializeScene: (sceneRef) => {
    // load a webscene
    const webscene = new WebScene({
      portalItem: {
        id: 'b6c889ff1f684cd7a65301984b80b93d'
      }
    });

    // create the scene view
    const view = new SceneView({
      container: sceneRef,
      map: webscene
    });
    return view;
  },

  initWidgets : (sceneView, topBarRef, distanceBtnRef, areaBtnRef) => {
    // add the toolbar for the measurement widgets
    sceneView.ui.add(topBarRef, 'top-right');
  
    //event handler for when the distance button is clicked - toggles activity
    distanceBtnRef.addEventListener("click", (event) => {
      initializationUtility.setActiveWidget(null, sceneView, distanceBtnRef, areaBtnRef);
      if (!event.target.classList.contains("active")) {
        initializationUtility.setActiveWidget("distance", sceneView, distanceBtnRef, areaBtnRef);
      } else {
        initializationUtility.setActiveButton(null, sceneView);
      }
    });
  
    //event handler for when the area button is clicked - toggles activity
    areaBtnRef.addEventListener("click", (event) => {
      initializationUtility.setActiveWidget(null);
      if (!event.target.classList.contains("active")) {
        initializationUtility.setActiveWidget("area", sceneView, distanceBtnRef, areaBtnRef);
      } else {
        initializationUtility.setActiveButton(null,sceneView);
      }
    });
  
    
  
    
  },

  /**
     * toggles the active widget based on the supplied widget type
     * @param {*} type 
     */
   setActiveWidget: (type, sceneView, distanceBtnRef, areaBtnRef)=> {
    var activeWidget = null;
    switch (type) {
      case "distance":
        activeWidget = new DirectLineMeasurement3D({
          view: sceneView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        sceneView.ui.add(activeWidget, 'top-right');
        initializationUtility.setActiveButton(distanceBtnRef, sceneView);
        break;
      case "area":
        activeWidget = new AreaMeasurement3D({
          view: sceneView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        sceneView.ui.add(activeWidget, 'top-right');
        initializationUtility.setActiveButton(areaBtnRef, sceneView);
        break;
      case null:
      default:
        if (activeWidget) {
          sceneView.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  },

  //sets the active button for styling
  setActiveButton: (selectedButton, sceneView) => {
    // focus the view to activate keyboard shortcuts for sketching
    sceneView.focus();
    const elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }
};

export default initializationUtility;