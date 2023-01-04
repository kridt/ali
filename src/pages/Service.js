import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../Firebase";

export default function Service() {
  const [kunder, setKunder] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    database
      .collection("users")
      .doc(auth?.currentUser?.uid)
      .collection("kunder")
      .get()
      .then((kunde) => {
        var kunder = [];
        kunde.forEach((doc) => {
          kunder.push(doc.data());
        });
        setKunder(kunder);
      });
  }, []);

  console.log(kunder);
  function findeAdress(e) {
    e.preventDefault();
    console.log(e.target.value);
    const test = kunder.find((kunde) => {
      if (kunde.adresse.includes(e.target.value)) {
        console.log("kunde fundet");
        setKunder([kunde]);
        return kunde;
      }
    });

    console.log(test);
  }

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1>Tilføj servicie til kunde</h1>

      <form>
        <label htmlFor="kunde">Find kunde via adresse: </label>
        <input
          onChange={(e) => findeAdress(e)}
          type="text"
          name="kundeAdresse"
          id="kunde"
        />
      </form>

      <div className="customer-list-container">
        {kunder?.map((kunde) => {
          return (
            <div
              style={{
                backgroundColor: "grey",
                padding: "10px",
                margin: "10px",
                marginTop: "20px",
              }}
            >
              <Link
                to={"/kundeSide/" + kunde.telefon}
                className="customer-list-item"
                key={kunde.telefon}
                style={{
                  color: "white",
                }}
              >
                <h2 style={{ textAlign: "center" }}>{kunde.name}</h2>
                <div>
                  <div>
                    <p>
                      Adresse: {kunde.adresse}, {kunde.postnummer} {kunde.by}
                    </p>
                  </div>
                  <div>
                    <p>Telefon: {kunde.telefon}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
