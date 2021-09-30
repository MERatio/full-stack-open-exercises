const Weather = ({ weather }) => {
	return (
		<div>
			<h2>Weather in {weather.location.name}</h2>
			<div>
				<b>temperature:</b> {weather.current.temperature} Celcius
			</div>
			<img
				src={weather.current.weather_icons[0]}
				alt={`Icon describing the ${weather.location.name}'s weather`}
			/>
			<div>
				<b>wind:</b> {weather.current.wind_speed} mph direction{' '}
				{weather.current.wind_dir}
			</div>
		</div>
	);
};

export default Weather;
