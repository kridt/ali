import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect } from "react";
import { database } from "../Firebase";

export default function MapSite() {
  const [allKunder, setAllKunder] = React.useState([]);
  const [kundeFocus, setKundeFocus] = React.useState({
    lat: 55.67023589999999,
    lng: 11.8794193,
  });
  
  const [center, setCenter] = React.useState({});
  
  useEffect(() => {
    database
      .collection("kunder")
      .get()
      .then((data) => {
        const kunder = data.docs.map((doc) => doc.data());
        setAllKunder(kunder);
      });
  }, []);

  const containerStyle = {
    width: "100vw",
    height: "50vh",
  };


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS,
  });

  function clickedMarker(e, item, days) {
    const allInfo = {
      name: item.name,
      adresse: item.adresse,
      telefon: item.telefon,
      daysTilService: days,
      postnummer: item.postnummer,
      by: item.by,
    };
    setKundeFocus(allInfo);
    console.log(item);
  }

  return isLoaded ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {/* Child components, such as markers, info windows, etc. */}
        <div>
          {allKunder?.map((item) => {
            const today = new Date().getTime();
            const lastService = new Date(item.date).getTime();
            const diff = today - lastService;
            const days = Math.floor(diff / 1000 / 60 / 60 / 24);
            var fancyAnimation = 2;
            if (14 > 365 - days) {
              fancyAnimation = 1;
            }

            return (
              <>
                <Marker
                  key={item.telefon}
                  position={item.geoLocation}
                  animation={fancyAnimation}
                  label={`${365 - days}`}
                  onClick={(e) => clickedMarker(e, item, 365 - days)}
                />
              </>
            );
          })}
        </div>
      </GoogleMap>
      <div>
        <h1>info</h1>
        <p>Navn: {kundeFocus && kundeFocus.name}</p>
        Adresse:{" "}
        <a
          target={"_blank"}
          href={`http://maps.google.com/?q=${
            kundeFocus && kundeFocus?.adresse
          }, ${kundeFocus && kundeFocus?.postnummer}, ${
            kundeFocus && kundeFocus?.by
          }}`}
        >
          {kundeFocus && kundeFocus?.adresse}
        </a>
        <br />
        <br />
        Telefon:{" "}
        <a href={`tel:${kundeFocus && kundeFocus?.telefon}`}>
          {kundeFocus && kundeFocus?.telefon}
        </a>
        <p>
          Dage til service:{" "}
          {kundeFocus && JSON.stringify(kundeFocus.daysTilService)} dage
        </p>
      </div>
    </>
  ) : (
    <></>
  );
}
