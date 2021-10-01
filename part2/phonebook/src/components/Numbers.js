import NumberItem from './NumberItem';

const Numbers = ({ persons, onDeletePerson }) => {
	return (
		<div>
			{persons.map((person) => (
				<NumberItem
					key={person.id}
					person={person}
					onDeletePerson={onDeletePerson}
				/>
			))}
		</div>
	);
};

export default Numbers;
