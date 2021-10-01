const NumberItem = ({ person, onDeletePerson }) => {
	return (
		<div>
			{person.name} {person.number}{' '}
			<button type="button" onClick={() => onDeletePerson(person.id)}>
				delete
			</button>
		</div>
	);
};

export default NumberItem;
