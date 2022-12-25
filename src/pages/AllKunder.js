import React from "react";

import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";

export default function AllKunder() {
  const [kunder, setKunder] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    database
      .collection("kunder")
      .get()
      .then((data) => {
        const kunder = [];
        data.forEach((doc) => {
          kunder.push({ ...doc.data(), id: doc.id });
        });
        setKunder(kunder);
      });
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1>Alle Kunder</h1>

      <div>
        {kunder.map((kunde) => {
          return (
            <div
              style={{ backgroundColor: "grey", marginBottom: "2em" }}
              key={kunde.id}
            >
              <p>{kunde.name}</p>
              <p>
                {kunde.adresse}, {kunde.postnummer} {kunde.by}
              </p>
              <p>{kunde.telefon}</p>
              <p>{kunde.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
