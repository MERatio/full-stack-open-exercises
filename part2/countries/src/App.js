import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleQueryChange = (e) => {
    setCountryToShow('');
    setQuery(e.target.value);
  };

  const handleShowCountry = (e) => setCountryToShow(e.target.dataset.country);

  const countriesToShow =
    query === ''
      ? []
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(
              countryToShow ? countryToShow.toLowerCase() : query.toLowerCase()
            )
        );

  return (
    <div>
      find countries{' '}
      <input type="text" value={query} onChange={handleQueryChange} />
      <Countries
        countries={countriesToShow}
        onShowCountry={handleShowCountry}
      />
    </div>
  );
}

export default App;
