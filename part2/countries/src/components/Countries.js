import Country from './Country';
import CountryFullInfo from './CountryFullInfo';

const Countries = ({ countries, onShowCountry }) => {
	return (
		<div>
			{countries.length > 10
				? 'Too many matches, specify another filter'
				: countries.length > 1
				? countries.map((country) => (
						<Country
							key={country.name.common}
							country={country}
							onShowCountry={onShowCountry}
						/>
				  ))
				: countries.length === 1 && <CountryFullInfo country={countries[0]} />}
		</div>
	);
};

export default Countries;
