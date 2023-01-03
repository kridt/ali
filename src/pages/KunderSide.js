import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KunderSide() {
  const navigate = useNavigate();
  const [kunde, setKunde] = useState({});
  const [dato, setDato] = useState("");

  useEffect(() => {
    const kunder = JSON.parse(localStorage.getItem("kunder"));
    const id = window.location.pathname.split("/")[2];
    const kunde = kunder.find((kunde) => kunde.id === id);
    var dato = kunde?.date?.split("-");
    setKunde(kunde);
    console.log(kunde);
    setDato((dato = dato[2] + "/" + dato[1] + "/" + dato[0]));
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1 style={{ textAlign: "center" }}>Kunde Information</h1>
      <div>
        <h2>Navn: {kunde?.name}</h2>
        <h2>
          Adresse:{" "}
          <a
            style={{ color: "white" }}
            href={
              `http://maps.google.com/?q=` +
              kunde?.adresse +
              "," +
              kunde?.postnummer +
              " " +
              kunde?.by
            }
            target="_blank"
          >
            {" "}
            {kunde?.adresse}
          </a>
        </h2>
        <h2>Service dato: {dato}</h2>
        <h2>
          Telefon nummer:{" "}
          <a style={{ color: "white" }} href={"tel:" + kunde.telefon}>
            {" "}
            {kunde?.telefon}
          </a>
        </h2>
      </div>
    </div>
  );
}
