import './index.css';
import { useState, useEffect } from 'react';
import personServices from './services/persons';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const resetPersonFormState = () => {
    setNewName('');
    setNewNumber('');
  };

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
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personServices.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      resetPersonFormState();
      setNotification({
        message: `Added ${returnedPerson.name}`,
        type: 'success',
      });
      setTimeout(() => setNotification({}), 5000);
    });
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirmDeletion = window.confirm(`Delete ${person.name} ?`);
    if (confirmDeletion) {
      const personWithDeletedPerson = persons.filter(
        (person) => person.id !== id
      );
      personServices
        .deleteObject(id)
        .then((deletedPerson) => {
          setPersons(personWithDeletedPerson);
        })
        .catch((error) => {
          setPersons(personWithDeletedPerson);
          const errorMessage = `Information of ${person.name} has already been removed from server`;
          console.log(errorMessage);
          setNotification({
            message: errorMessage,
            type: 'error',
          });
          setTimeout(() => setNotification({}), 5000);
        });
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
      <Notification notification={notification} />
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
      <Numbers persons={personsToShow} onDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
