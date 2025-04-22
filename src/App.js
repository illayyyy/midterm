"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import CountryDetails from "./components/countryDetails"
import Flag from "./components/flags"
import Borders from "./components/borders"
import Header from "./components/header"
import Footer from "./components/footer"
import LoadingSpinner from "./components/loadingSpinner"
import "./App.css"

const App = () => {
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null)
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const BASE_URL = "https://countries-api-abhishek.vercel.app/countries"

  const fetchCountryData = useCallback((searchTerm) => {
    setIsLoading(true)
    setError(null)

    axios
      .get(`${BASE_URL}/${searchTerm}`)
      .then((response) => {
        const data = response.data.data

        if (data && data.name) {
          setCountry(data)
          setError(null)
        } else {
          setCountry(null)
          setError("Country not found.")
        }
      })
      .catch((error) => {
        console.error("API error:", error)
        setCountry(null)
        setError("Something went wrong.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchCountryData("afghanistan")
  }, [fetchCountryData])

  useEffect(() => {
    setIsInitialLoading(true)

    axios
      .get(BASE_URL)
      .then((response) => {
        const data = response.data
        const countryArray = Array.isArray(data) ? data : data.data
        if (Array.isArray(countryArray)) {
          setAllCountries(countryArray)
        } else {
          console.warn("Unexpected allCountries format:", data)
        }
      })
      .catch((error) => console.error("Error loading all countries:", error))
      .finally(() => {
        setIsInitialLoading(false)
      })
  }, [])

  const handleRegionFilter = (region) => {
    if (!region) {
      setFilteredCountries([])
    } else {
      const filtered = allCountries.filter((c) => c.region === region)
      setFilteredCountries(filtered)
    }
  }

  const handleSearch = () => {
    if (search.trim()) {
      fetchCountryData(search)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.trim()) {
      fetchCountryData(search)
    }
  }

  return (
    <div className="app-container">
      <Header />

      <div className="search-section">
        <div className="search-box">
          <input
            className="input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a country"
          />
          <button className="button" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        <select className="select" onChange={(e) => handleRegionFilter(e.target.value)} disabled={isInitialLoading}>
          <option value="">Find Country By Continent</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="country-list">
        {isInitialLoading ? (
          <div className="loading-container">
            <LoadingSpinner size="small" />
            <span>Loading countries...</span>
          </div>
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((c) => (
            <button key={c.name} onClick={() => fetchCountryData(c.name)} className="country-button">
              {c.name}
            </button>
          ))
        ) : (
          <div className="no-countries">No Continent Detected</div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading-card">
          <LoadingSpinner />
          <p>Loading country data...</p>
        </div>
      ) : country ? (
        <div className="country-box">
          {/* Try different ways of accessing the flag URL */}
          {country.flags?.svg && <Flag flagUrl={country.flags.svg} />}
          {!country.flags?.svg && country.flags?.png && <Flag flagUrl={country.flags.png} />}
          {!country.flags?.svg && !country.flags?.png && country.flag && <Flag flagUrl={country.flag} />}

          <CountryDetails country={country} />
          <Borders borders={country.borders} onBorderClick={fetchCountryData} />
        </div>
      ) : null}

      <Footer />
    </div>
  )
}

export default App
