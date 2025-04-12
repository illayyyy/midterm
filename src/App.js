import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
import Flag from './components/Flags';
import Borders from './components/Borders';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const fetchCountryData = useCallback((searchTerm) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://nationnode.vercel.app/${searchTerm}`)
      .then(response => {
        console.log('API Response:', response.data); // ✅ Add this line
  
        const countryData =
          response.data.find(
            (country) => country.name.common.toLowerCase() === searchTerm.toLowerCase()
          ) || response.data[0]; // fallback in case match fails
  
        if (countryData) {
          setCountry(countryData);
          setError(null);
        } else {
          setCountry(null);
          setError('Country not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setError('Something went wrong');
        setCountry(null);
      });
  }, []);
  
  // Fetch Afghanistan on initial load
  useEffect(() => {
    fetchCountryData('afghanistan');
  }, [fetchCountryData]);

  // Fetch all countries for filtering
  useEffect(() => {
    axios.get('https://nationnode.vercel.app/all')
      .then(response => {
        setAllCountries(response.data);
      })
      .catch(err => console.error('Error fetching all countries:', err));
  }, []);

  // Handle region filtering
  const handleRegionFilter = (region) => {
    const filtered = allCountries.filter(c => c.region === region);
    setFilteredCountries(filtered);
  };

  return (
    <div className="container">
      <Header />

      {/* Search and Filter */}
      <div className="search-section">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country"
        />
        <button onClick={() => fetchCountryData(search)}>Search</button>

        <select onChange={(e) => handleRegionFilter(e.target.value)}>
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Filtered Country Buttons */}
      <div className="filtered-list">
        {filteredCountries.map((c) => (
          <button
            key={c.cca3}
            onClick={() => fetchCountryData(c.name.common)}
            className="country-btn"
          >
            {c.name.common}
          </button>
        ))}
      </div>

      {/* Country Info */}
      {error && <div>{error}</div>}
      {country && (
        <div className="country-box">
          <Flag flagUrl={country.flags.svg} />
          <CountryDetails country={country} />
          <Borders borders={country.borders} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
  