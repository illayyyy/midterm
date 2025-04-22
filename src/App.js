"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedPopulationRange, setSelectedPopulationRange] = useState("any")
  const [selectedAreaRange, setSelectedAreaRange] = useState("any")
  const [showFilters, setShowFilters] = useState(false)
  const suggestionsRef = useRef(null)

  const BASE_URL = "https://countries-api-abhishek.vercel.app/countries"

  // Predefined population ranges
  const populationRanges = [
    { value: "any", label: "Any Population" },
    { value: "0-100000", label: "< 100K" },
    { value: "100000-1000000", label: "100K - 1M" },
    { value: "1000000-10000000", label: "1M - 10M" },
    { value: "10000000-50000000", label: "10M - 50M" },
    { value: "50000000-100000000", label: "50M - 100M" },
    { value: "100000000-500000000", label: "100M - 500M" },
    { value: "500000000-2000000000", label: "> 500M" },
  ]

  // Predefined area ranges (in km²)
  const areaRanges = [
    { value: "any", label: "Any Area" },
    { value: "0-1000", label: "< 1,000 km²" },
    { value: "1000-10000", label: "1,000 - 10,000 km²" },
    { value: "10000-100000", label: "10,000 - 100,000 km²" },
    { value: "100000-500000", label: "100,000 - 500,000 km²" },
    { value: "500000-1000000", label: "500,000 - 1M km²" },
    { value: "1000000-10000000", label: "> 1M km²" },
  ]

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
        setError("Country does not exist.")
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

  // Parse range string to get min and max values
  const parseRange = (rangeStr) => {
    if (rangeStr === "any") return { min: 0, max: Number.MAX_SAFE_INTEGER }

    const [min, max] = rangeStr.split("-").map(Number)
    return { min, max: max || Number.MAX_SAFE_INTEGER }
  }

  // Apply all filters (region, population, area)
  const applyFilters = useCallback(() => {
    if (!allCountries.length) return

    let filtered = [...allCountries]

    // Apply region filter
    if (selectedRegion) {
      filtered = filtered.filter((c) => c.region === selectedRegion)
    }

    // Apply population filter
    if (selectedPopulationRange !== "any") {
      const { min, max } = parseRange(selectedPopulationRange)
      filtered = filtered.filter((c) => {
        const population = c.population || 0
        return population >= min && population <= max
      })
    }

    // Apply area filter
    if (selectedAreaRange !== "any") {
      const { min, max } = parseRange(selectedAreaRange)
      filtered = filtered.filter((c) => {
        const area = c.area || 0
        return area >= min && area <= max
      })
    }

    setFilteredCountries(filtered)
  }, [allCountries, selectedRegion, selectedPopulationRange, selectedAreaRange])

  // Update filters when any filter criteria changes
  useEffect(() => {
    applyFilters()
  }, [selectedRegion, selectedPopulationRange, selectedAreaRange, applyFilters])

  // Handle search input changes and generate suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)

    if (value.trim() === "") {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Filter countries based on input
    const searchLower = value.toLowerCase()
    const filtered = allCountries.filter((country) => country.name.toLowerCase().includes(searchLower)).slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filtered)
    setShowSuggestions(true)
  }

  // Handle clicking outside suggestions to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleRegionFilter = (region) => {
    setSelectedRegion(region)
  }

  const handlePopulationRangeChange = (e) => {
    setSelectedPopulationRange(e.target.value)
  }

  const handleAreaRangeChange = (e) => {
    setSelectedAreaRange(e.target.value)
  }

  const handleSearch = () => {
    if (search.trim()) {
      fetchCountryData(search)
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.trim()) {
      fetchCountryData(search)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (countryName) => {
    setSearch(countryName)
    fetchCountryData(countryName)
    setShowSuggestions(false)
  }

  const resetFilters = () => {
    setSelectedRegion("")
    setSelectedPopulationRange("any")
    setSelectedAreaRange("any")
  }

  // Get label for selected range
  const getSelectedRangeLabel = (ranges, selectedValue) => {
    const range = ranges.find((r) => r.value === selectedValue)
    return range ? range.label : "Any"
  }

  return (
    <div className="app-container">
      <Header />

      <div className="search-section">
        <div className="search-box" ref={suggestionsRef}>
          <input
            className="input"
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for a country"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.name}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
          <button className="button" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="filters-container">
          <div className="filters-header">
            <button className="filter-toggle-button" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            {showFilters && (
              <button className="reset-filters-button" onClick={resetFilters}>
                Reset Filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-grid">
                <div className="filter-item">
                  <label htmlFor="region-select">Region:</label>
                  <select
                    id="region-select"
                    className="filter-select"
                    value={selectedRegion}
                    onChange={(e) => handleRegionFilter(e.target.value)}
                    disabled={isInitialLoading}
                  >
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>

                <div className="filter-item">
                  <label htmlFor="population-select">Population:</label>
                  <select
                    id="population-select"
                    className="filter-select"
                    value={selectedPopulationRange}
                    onChange={handlePopulationRangeChange}
                    disabled={isInitialLoading}
                  >
                    {populationRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-item">
                  <label htmlFor="area-select">Area:</label>
                  <select
                    id="area-select"
                    className="filter-select"
                    value={selectedAreaRange}
                    onChange={handleAreaRangeChange}
                    disabled={isInitialLoading}
                  >
                    {areaRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="active-filters">
                <p>Active Filters:</p>
                <ul>
                  <li>Region: {selectedRegion || "All"}</li>
                  <li>Population: {getSelectedRangeLabel(populationRanges, selectedPopulationRange)}</li>
                  <li>Area: {getSelectedRangeLabel(areaRanges, selectedAreaRange)}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="country-list">
        {isInitialLoading ? (
          <div className="loading-container">
            <LoadingSpinner size="small" />
            <span>Loading countries...</span>
          </div>
        ) : filteredCountries.length > 0 ? (
          <>
            <div className="filtered-count">Found {filteredCountries.length} countries</div>
            <div className="country-buttons">
              {filteredCountries.map((c) => (
                <button key={c.name} onClick={() => fetchCountryData(c.name)} className="country-button">
                  {c.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="no-countries">No countries match your filters</div>
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
