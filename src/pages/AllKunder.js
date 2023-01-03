import React from "react";
import "./AllKunder.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../Firebase";

export default function AllKunder() {
  const [kunder, setKunder] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    database
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("kunder")
      .get()
      .then((data) => {
        const kunder = [];
        data.forEach((doc) => {
          kunder.push({ ...doc.data(), id: doc.id });
        });
        setKunder(kunder);
        localStorage.setItem("kunder", JSON.stringify(kunder));
      });
  }, []);
  console.log(kunder);
  return (
    <div>
      <div className="customer-list-container">
        <button onClick={() => navigate("/dashboard")}>Tilbage</button>
        <h1 style={{ textAlign: "center" }}>Alle Kunder</h1>
        <p>Tryk på en kunde for at gå til kundesiden</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Adresse</th>
              <th>Service dato</th>
            </tr>
          </thead>

          {kunder.map((kunde) => {
            var dato = kunde.date.split("-");
            dato = dato[2] + "/" + dato[1] + "/" + dato[0];
            console.log(kunde);
            return (
              <tbody key={kunde.id}>
                <tr>
                  <td>
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "1em 0",
                      }}
                      to={"/kundeSide/" + kunde.id}
                    >
                      {kunde.name}
                    </Link>
                  </td>
                  <td style={{ height: "1em" }}>
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "1em 0",
                      }}
                      to={"/kundeSide/" + kunde.id}
                    >
                      {kunde.adresse}
                    </Link>
                  </td>
                  <td>
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "1em 0",
                      }}
                      to={"/kundeSide/" + kunde.id}
                    >
                      {dato}
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
}
