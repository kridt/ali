import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";

export default function Service() {
  const [kunder, setKunder] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");
  }, []);

  function findeAdress(e) {}

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1>Tilføj servicie til kunde</h1>

      <form>
        <label htmlFor="kunde">Kunde adresse: </label>
        <input type="text" name="kundeAdresse" id="kunde" />
      </form>

      <div className="customer-list-container"></div>
    </div>
  );
}
