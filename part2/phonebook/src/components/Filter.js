const Filter = ({ nameFilter, onNameFilterChange }) => {
	return (
		<div>
			filter shown with{' '}
			<input value={nameFilter} onChange={onNameFilterChange} />
		</div>
	);
};

export default Filter;
