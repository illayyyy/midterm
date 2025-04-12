const CountryDetails = ({ country }) => {
    const currency = country.currencies
      ? Object.values(country.currencies)[0]?.name
      : 'N/A';
  
    const languages = country.languages
      ? Object.values(country.languages).join(', ')
      : 'N/A';
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        <p><strong>Region:</strong> {country.region} / {country.subregion}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Coordinates:</strong> {country.latlng.join(', ')}</p>
        <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        <p><strong>Currency:</strong> {currency}</p>
        <p><strong>Languages:</strong> {languages}</p>
      </div>
    );
  };
  
  export default CountryDetails;
  