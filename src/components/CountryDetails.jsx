import React from 'react';

const CountryDetails = ({ country }) => {
  if (!country) return null;

  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    coordinates,
    timezones,
    currencies,
    languages,
  } = country;

  return (
    <div className="country-details">
      <h2>{name.common}</h2>

      {capital && <p><strong>Capital:</strong> {capital}</p>}
      {region && <p><strong>Region:</strong> {region}</p>}
      {subregion && <p><strong>Subregion:</strong> {subregion}</p>}
      {population && <p><strong>Population:</strong> {population}</p>}
      {area && <p><strong>Area:</strong> {area} km²</p>}

      {coordinates?.latitude && coordinates?.longitude && (
        <p><strong>Coordinates:</strong> Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}</p>
      )}

      {timezones?.length > 0 && (
        <p><strong>Timezones:</strong> {timezones.join(', ')}</p>
      )}

      {currencies && Object.values(currencies).map((currency, index) => (
        <p key={index}><strong>Currency:</strong> {currency.name} ({currency.symbol})</p>
      ))}

      {languages && (
        <p><strong>Languages:</strong> {languages.join(', ')}</p>
      )}
    </div>
  );
};

export default CountryDetails;
