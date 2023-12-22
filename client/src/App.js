// import './App.css';
import "./styles/App.scss"
import CanvasComponent from './Components/CanvasComponent';
import Toolbar from "./Components/Toolbar";
import SettingBar from "./Components/SettingBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import { RoomDoor } from "./Components/RoomDoor/RoomDoor";

function App() {

  const [roomDoor, set_roomDoor] = useState(true);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/:id" element={
            <>
              <Toolbar />
              <SettingBar />
              {
                roomDoor
                  ?
                  <RoomDoor />
                  :
                  < CanvasComponent />
              }
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
