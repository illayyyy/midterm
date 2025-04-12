import React from 'react';

const CountryDetails = ({ country }) => {
  if (!country) return null;  // Return null if country is not available

  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    coordinates,  // Coordinates object
    timezones,
    currencies,
    languages,
    flags,
  } = country;

  return (
    <div className="country-details">
      <h2>{name.common}</h2>

      {/* Capital */}
      {capital && <p><strong>Capital:</strong> {capital}</p>}

      {/* Region and Subregion */}
      {region && <p><strong>Region:</strong> {region}</p>}
      {subregion && <p><strong>Subregion:</strong> {subregion}</p>}

      {/* Population */}
      {population && <p><strong>Population:</strong> {population}</p>}

      {/* Area */}
      {area && <p><strong>Area:</strong> {area} km²</p>}

      {/* Coordinates */}
      {coordinates && coordinates.latitude && coordinates.longitude && (
        <p>
          <strong>Coordinates:</strong> Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      )}

      {/* Timezones */}
      {timezones && timezones.length > 0 && (
        <p>
          <strong>Timezones:</strong> {timezones.join(', ')}
        </p>
      )}

      {/* Currency */}
      {currencies && Object.values(currencies).map((currency, index) => (
        <p key={index}><strong>Currency:</strong> {currency.name} ({currency.symbol})</p>
      ))}

      {/* Languages */}
      {languages && (
        <p><strong>Languages:</strong> {languages.join(', ')}</p>
      )}

      {/* Flag */}
      {flags && <img src={flags.svg} alt="Flag" style={{ width: '100px', height: 'auto' }} />}
    </div>
  );
};

export default CountryDetails;
