import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../Firebase";
import Geocode from "react-geocode";
import "./AddKunde.css";

export default function AddKunde() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  useEffect(() => {
    if (auth?.currentUser?.email === undefined) {
      navigate("/");
    }
  }, [navigate]);
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
    const fullAdress = `${e.target.adresse.value}, ${e.target.postnummer.value} ${city}`;
    var data = {
      name: e.target.name.value,
      adresse: e.target.adresse.value,
      postnummer: e.target.postnummer.value,
      by: e.target.by.value,
      geoLocation: {
        lat: 0,
        lng: 0,
      },
      telefon: e.target.telefon.value,
      date: e.target.date.value,
      timeStampOfCreation: Date.now(),
    };

    Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS);
    Geocode.setRegion("dk");

    Geocode.fromAddress(fullAdress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        data.geoLocation.lat = lat;
        data.geoLocation.lng = lng;

        console.log(data);
        database
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("kunder")
          .doc(e.target.telefon.value)
          .set(data)
          .then(() => {
            navigate("/dashboard");
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div>
      <div className="add-customer-container">
        <button onClick={() => navigate("/dashboard")}>Tilbage</button>
        <h1>Tilf??j en ny kunde</h1>

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
            <label htmlFor="dato">Dato for ops??tning: </label>
            <input required type="date" name="date" id="date" />
          </div>
          <br />
          <br />
          <div>
            <button type="submit">Tilf??j kunde</button>
          </div>
        </form>
      </div>
    </div>
  );
}
