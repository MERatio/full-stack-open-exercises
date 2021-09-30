const Country = ({ country, onShowCountry }) => {
	return (
		<div>
			{country.name.common}
			<button data-country={country.name.common} onClick={onShowCountry}>
				show
			</button>
		</div>
	);
};

export default Country;
