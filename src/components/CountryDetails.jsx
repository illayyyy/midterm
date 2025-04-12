import React from 'react';

const CountryDetails = ({ country }) => {
  return (
    <div className="country-details">
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Coordinates:</strong> {country.latlng ? `${country.latlng[0]}° N, ${country.latlng[1]}° E` : 'N/A'}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A'}</p>
      <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
    </div>
  );
};

export default CountryDetails;
