import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries ";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [hasFilter, setHasFilter] = useState(false);

  const fetchCount = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCount, []);

  const filterCount = countries.filter((country) => {
    return country.name.toLowerCase().includes(countryFilter.toLowerCase());
  });

  const hasExactMatch = filterCount.some((country) => {
    return country.name.toLowerCase() === countryFilter.toLowerCase();
  });

  let pathFilterCountry;
  if (hasExactMatch) {
    pathFilterCountry = filterCount.filter((country) => {
      return country.name.toLowerCase() === countryFilter.toLowerCase();
    });
  }

  const handleChange = (event) => {
    setCountryFilter(event.target.value);

    if (event.target.value === "") setHasFilter(false);
    else setHasFilter(true);
  };

  const handleClick = (event) => {
    setCountryFilter(event.target.id);
  };

  return (
    <div>
      <h1>Data For Countries</h1>
      <Filter onChange={(event) => handleChange(event)} value={countryFilter} />
      {hasFilter && hasExactMatch && (
        <Countries countries={pathFilterCountry} />
      )}
      {hasFilter && !hasExactMatch && (
        <Countries
          countries={filterCount}
          handleClick={(event) => handleClick(event)}
        />
      )}
    </div>
  );
}

export default App;
