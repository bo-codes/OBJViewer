import OBJViewer from "./OBJViewer/OBJViewer";
import kwan from "./kwan_model.obj"

function App() {
  return (
    <OBJViewer OBJFile={kwan}/>
  );
}

export default App;
