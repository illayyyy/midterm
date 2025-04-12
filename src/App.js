import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CountryDetails from './components/countryDetails';
import Flag from './components/flags';
import Borders from './components/borders';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const BASE_URL = 'https://countries-api-abhishek.vercel.app/countries';

  // Fetch a single country
  const fetchCountryData = useCallback((searchTerm) => {
    axios.get(`${BASE_URL}/${searchTerm}`)
      .then(response => {
        const data = response.data.data;

        if (data && data.name) {
          console.log('Fetched country:', data);
          setCountry(data);
          setError(null);
        } else {
          setCountry(null);
          setError('Country not found.');
        }
      })
      .catch(error => {
        console.error('API error:', error);
        setCountry(null);
        setError('Something went wrong.');
      });
  }, []);

  // Load default country
  useEffect(() => {
    fetchCountryData('afghanistan');
  }, [fetchCountryData]);

  // Load all countries
  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => {
        const data = response.data;
        const countryArray = Array.isArray(data) ? data : data.data;
        if (Array.isArray(countryArray)) {
          setAllCountries(countryArray);
        } else {
          console.warn('Unexpected allCountries format:', data);
        }
      })
      .catch(error => console.error('Error loading all countries:', error));
  }, []);

  // Handle region filter
  const handleRegionFilter = (region) => {
    if (!region) {
      setFilteredCountries([]);
    } else {
      const filtered = allCountries.filter((c) => c.region === region);
      setFilteredCountries(filtered);
    }
  };

  // Handle search
  const handleSearch = () => {
    fetchCountryData(search);
  };

  return (
    <div style={styles.container}>
      <Header />

      {/* Search and Filter */}
      <div style={styles.searchSection}>
        <input
          style={styles.input}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country"
        />
        <button style={styles.button} onClick={handleSearch}>Search</button>

        <select style={styles.select} onChange={(e) => handleRegionFilter(e.target.value)}>
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Region Buttons */}
      <div style={styles.filteredList}>
        {filteredCountries.map((c) => (
          <button
            key={c.name}
            onClick={() => fetchCountryData(c.name)}
            style={styles.countryButton}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Country Info */}
      {error && <div>{error}</div>}
      {country && (
        <div style={styles.countryBox}>
          {/* ✅ Check flags.svg */}
          {country.flags && country.flags.svg && (
           <Flag flagUrl={country.flag} />



)}
<CountryDetails country={country} />

          <Borders borders={country.borders} onBorderClick={fetchCountryData} />
        </div>
      )}

      <Footer />
    </div>
  );
};

// 💅 Simple pastel, centered styling
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#fffafc',
  },
  searchSection: {
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    width: '60%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '8px',
  },
  button: {
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#ffcce0',
    color: '#333',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  select: {
    marginLeft: '10px',
    padding: '8px',
    borderRadius: '5px',
  },
  filteredList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  countryButton: {
    backgroundColor: '#e3f2fd',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  countryBox: {
    backgroundColor: '#fce4ec',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
  },
};

export default App;
