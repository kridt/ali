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

  const [setMap] = React.useState(null);

  /*  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []); */

  const onUnmount = React.useCallback(
    function callback(map) {
      setMap(null);
    },
    [setMap]
  );

  useEffect(() => {
    var d = new Date();
    var test = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    console.log(test);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      /* onLoad={onLoad} */
      onUnmount={onUnmount}
      zoom={7}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <div>
        {allKunder?.map((item) => {
          const dayCount = item.date.split("-")[2];
          const monthCount = item.date.split("-")[1];
          return (
            <Marker
              key={item.telefon}
              position={item.geoLocation}
              animation={2}
              label={item.service}
              onClick={(e) => console.log(e.latLng.toJSON())}
            />
          );
        })}
      </div>

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
