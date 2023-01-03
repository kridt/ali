import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginSite from "./pages/LoginSite";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./Firebase";
import AddKunde from "./pages/AddKunde";
import AllKunder from "./pages/AllKunder";
import MapSite from "./pages/MapSite";
import Service from "./pages/Service";
import KunderSide from "./pages/KunderSide";
import AdminSite from "./pages/AdminSite";

function App() {
  const [user, setUser] = useState(auth?.currentUser);
  console.log(user?.email);
  useEffect(() => {
    auth?.currentUser && setUser(auth?.currentUser);
    if (auth?.currentUser?.email === undefined) {
      setUser(null);
    }
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
            <Route path="/service" element={<Service />} />
            <Route path="/kundeSide/:id" element={<KunderSide />} />
            <Route path="/admin" element={<AdminSite />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
