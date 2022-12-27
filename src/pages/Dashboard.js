import React from "react";
import { Link } from "react-router-dom";
/* import { UserContext } from "../contexts/UserContext";
import { auth } from "../Firebase"; */

export default function Dashboard() {
  /*  const { user, setUser } = useContext(UserContext); */
  /*  const navigate = useNavigate(); */
  return (
    <div>
      <h1>Dashboard</h1>

      <Link to="/addKunde">Tilføj ny kunde</Link>
      <br />
      <br />
      <Link to="/allKunder">Se alle kunder</Link>
      <br />
      <br />
      <Link to="/kort">Se kortet</Link>
      <br />
      <br />
      <Link to="/service">Har du lavet service</Link>
      <br />
      <br />
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
  );
}
