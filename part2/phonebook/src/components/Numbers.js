import NumberItem from './NumberItem';

const Numbers = ({ persons }) => {
	return (
		<div>
			{persons.map((person) => (
				<NumberItem key={person.id} person={person} />
			))}
		</div>
	);
};

export default Numbers;
