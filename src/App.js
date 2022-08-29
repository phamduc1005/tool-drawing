import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DrawingColors from "./components/drawing-colors/drawingColors";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' exact element={<DrawingColors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
