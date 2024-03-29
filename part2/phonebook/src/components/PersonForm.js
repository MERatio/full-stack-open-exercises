const PersonForm = ({
	newName,
	newNumber,
	onNewNameChange,
	onNewNumberChange,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input value={newName} onChange={onNewNameChange} />
			</div>
			<div>
				number: <input value={newNumber} onChange={onNewNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
