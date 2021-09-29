import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handlePersonFormSubmit = (e) => {
    e.preventDefault();
    const isNameDuplicate = persons.some((person) => person.name === newName);
    if (isNameDuplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const personsToShow =
    nameFilter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameFilter}
        onNameFilterChange={handleNameFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNewNameChange={handleNewNameChange}
        onNewNumberChange={handleNewNumberChange}
        onSubmit={handlePersonFormSubmit}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} />
    </div>
  );
};

export default App;
