import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import "./Dashboard.css";
import { UserContext } from "../contexts/UserContext";

export default function Dashboard() {
  const { setUser } = useContext(UserContext);
  /*  const navigate = useNavigate(); */
  const [admin, setAdmin] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth?.currentUser?.email === "chrnielsen2003@gmail.com") {
      setAdmin(true);
    }
  }, [admin]);

  return (
    <div>
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <ul>
          <Link to="/addKunde">Tilføj ny kunde</Link>

          <Link to="/allKunder">Se alle kunder</Link>

          <Link to="/kort">Se kortet</Link>

          <Link to="/service">Har du lavet service</Link>
        </ul>

        {/* <button
        onClick={() => {
          auth.signOut();
          setUser(null);
          navigate("/");
        }}
        >
        Logout
      </button> */}
      </div>
      {admin && (
        <>
          <Link to="/admin">Admin</Link>
        </>
      )}
      <button
        style={{ marginTop: "6em" }}
        onClick={() => {
          auth.signOut();
          setUser(null);
          navigate("/");
        }}
      >
        Log ud af profil
      </button>
    </div>
  );
}
