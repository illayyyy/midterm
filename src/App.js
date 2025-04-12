import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
import Flag from './components/Flags';
import Borders from './components/Borders';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [search, setSearch] = useState('afghanistan');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchCountryData = useCallback((searchTerm) => {
    axios.get(`https://nationnode.vercel.app/${searchTerm}`)
      .then(response => {
        const countryData = response.data.find(
          (country) => country.name.common.toLowerCase() === searchTerm.toLowerCase()
        );

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

  useEffect(() => {
    fetchCountryData('afghanistan'); // Load default on start
  }, [fetchCountryData]);

  return (
    <div className="container">
      <Header />
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
