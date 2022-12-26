import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect } from "react";
import { database } from "../Firebase";

export default function MapSite() {
  const [allKunder, setAllKunder] = React.useState([]);

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
    height: "100vh",
  };

  const center = {
    lat: 55.67023589999999,
    lng: 11.8794193,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS,
  });

  function clickedMarker(e, item) {
    console.log(item);
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      {/* Child components, such as markers, info windows, etc. */}
      <div>
        {allKunder?.map((item) => {
          const today = new Date().getTime();
          const lastService = new Date(item.date).getTime();
          const diff = today - lastService;
          const days = Math.floor(diff / 1000 / 60 / 60 / 24);

          return (
            <>
              <Marker
                key={item.telefon}
                position={item.geoLocation}
                animation={2}
                label={`${365 - days}`}
                onClick={(e) => clickedMarker(e, item)}
              />
            </>
          );
        })}
      </div>

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
