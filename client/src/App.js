// import './App.css';
import "./styles/App.scss"
import CanvasComponent from './Components/CanvasComponent';
import Toolbar from "./Components/Toolbar";
import SettingBar from "./Components/SettingBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/:id" element={<>
            <Toolbar />
            <SettingBar />
            <CanvasComponent />
          </>
          } />
          <Route
            path="*"
            element={<Navigate to={`f${(+new Date).toString(16)}`} replace />}
          />
          {/* <Redirect to={`f${(+new Date).toString(16)}`} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
