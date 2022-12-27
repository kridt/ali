import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase";

export default function Service() {
  const [allKunder, setAllKunder] = React.useState([]);
  const [filteredKunder, setFilteredKunder] = React.useState([]);
  const [searchName, setSearchName] = React.useState("");
  const [searchTelefon, setSearchTelefon] = React.useState("");
  const [searchAdress, setSearchAdress] = React.useState("");
  const navigate = useNavigate();
  var filteredKunderTelefon = allKunder.filter((item) =>
    item.telefon.includes(searchTelefon)
  );
  var filteredKunderName = allKunder.filter((item) =>
    item.name.includes(searchName)
  );
  var filteredKunderAdress = allKunder.filter((item) =>
    item.adresse.includes(searchAdress)
  );

  useEffect(() => {
    database
      .collection("kunder")
      .get()
      .then((data) => {
        const kunder = data.docs.map((doc) => doc.data());
        setAllKunder(kunder);
      });
  }, []);

  function handleSearchName(e) {
    setSearchName(e);
    setFilteredKunder(filteredKunderName);
  }
  function handleSearchTelefon(e) {
    setSearchTelefon(e);
    setFilteredKunder(filteredKunderTelefon);
  }
  function handleSearchAdress(e) {
    setSearchAdress(e);
    setFilteredKunder(filteredKunderAdress);
  }

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1>Service</h1>
      <form>
        <label htmlFor="kunde">Søg efter kunde</label>
        <div>
          <label htmlFor="kunde">Navn</label>
          <input
            onChange={(e) => handleSearchName(e.target.value)}
            type="text"
            id="kunde"
          />
        </div>
        <br />
        <div>
          <label htmlFor="telefon">Telefon</label>
          <input onChange={(e) => handleSearchTelefon(e.target.value)} />
        </div>
        <br />
        <div>
          <label htmlFor="telefon">Adresse</label>
          <input onChange={(e) => handleSearchAdress(e.target.value)} />
        </div>
      </form>

      <div>
        {filteredKunder?.map((item) => {
          return (
            <div>
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
