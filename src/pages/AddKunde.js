import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";

export default function AddKunde() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  function citySetter(e) {
    if (e.target.value.length === 4) {
      axios.get("/postnumre.json").then((res) => {
        var city = res.data.find(
          (postnummer) => parseInt(postnummer.nr) === parseInt(e.target.value)
        );

        setCity(city.navn);
      });
    }
    if (e.target.value.length <= 3) {
      setCity("");
    }
  }

  function handleAddKunde(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      adresse: e.target.adresse.value,
      postnummer: e.target.postnummer.value,
      by: e.target.by.value,
      telefon: e.target.telefon.value,
      date: e.target.date.value,
    };

    database
      .collection("kunder")
      .doc(e.target.telefon.value)
      .set(data)
      .then(() => {
        navigate("/dashboard");
      });

    console.log(data);
  }

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1>Tilføj en ny kunde</h1>

      <form onSubmit={(e) => handleAddKunde(e)}>
        <div>
          <label htmlFor="name">Navn: </label>
          <input required type="text" name="name" id="name" />
        </div>
        <br />
        <div>
          <label htmlFor="adresse">Adresse: </label>
          <input required type="text" name="adresse" id="adresse" />
        </div>
        <br />
        <div>
          <label htmlFor="postnummer">Postnummer: </label>
          <input
            required
            onChange={(e) => citySetter(e)}
            type="tel"
            name="postnummer"
            id="postnummer"
          />
        </div>

        <br />
        <div>
          <label htmlFor="by">By: </label>
          <input required type="text" defaultValue={city} name="by" id="by" />
        </div>
        <br />
        <div>
          <label htmlFor="telefon">Telefon: </label>
          <input required type="tel" name="telefon" id="telefon" />
        </div>
        <br />
        <div>
          <label htmlFor="dato">Dato for opsætning: </label>
          <input required type="date" name="date" id="date" />
        </div>
        <br />
        <br />
        <div>
          <button type="submit">Tilføj kunde</button>
        </div>
      </form>
    </div>
  );
}
