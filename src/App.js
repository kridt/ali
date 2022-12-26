import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginSite from "./pages/LoginSite";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./Firebase";
import AddKunde from "./pages/AddKunde";
import AllKunder from "./pages/AllKunder";
import MapSite from "./pages/MapSite";

function App() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.currentUser && setUser(auth.currentUser);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginSite />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addKunde" element={<AddKunde />} />
            <Route path="/allKunder" element={<AllKunder />} />
            <Route path="/kort" element={<MapSite />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
