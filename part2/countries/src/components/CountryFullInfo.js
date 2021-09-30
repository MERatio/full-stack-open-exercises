import { useState, useEffect } from 'react';
import axios from 'axios';
import Languages from './Languages';
import Weather from './Weather';

const CountryFullInfo = ({ country }) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.name.common}`
			)
			.then((response) => setWeather(response.data));
	}, [country]);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital[0]}</div>
			<div>population {country.population}</div>
			<h2>languages</h2>
			<Languages languages={country.languages} />
			<img
				src={country.flags.svg}
				alt={`${country.name.common}'s flag`}
				width="170"
			/>
			{weather.current && <Weather weather={weather} />}
		</div>
	);
};

export default CountryFullInfo;
