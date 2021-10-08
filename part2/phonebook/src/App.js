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
    const foundPerson = persons.find((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (foundPerson) {
      const confirmNumberUpdate = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmNumberUpdate) {
        personServices
          .update(foundPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNotification({
              message: `${returnedPerson.name}'s number is successfully updated`,
              type: 'success',
            });
            setTimeout(() => setNotification({}), 5000);
          })
          .catch((error) => {
            if (
              error.response.data.error ===
              "Person's phonebook info is already deleted"
            ) {
              setPersons(
                persons.filter((person) => person.id !== foundPerson.id)
              );
            }
            console.log(error.response.data.error);
            setNotification({
              message: error.response.data.error,
              type: 'error',
            });
            setTimeout(() => setNotification({}), 5000);
          });
        resetPersonFormState();
      }
    } else {
      personServices
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          resetPersonFormState();
          setNotification({
            message: `Added ${returnedPerson.name}`,
            type: 'success',
          });
          setTimeout(() => setNotification({}), 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            type: 'error',
          });
          setTimeout(() => setNotification({}), 5000);
        });
    }
  };

  const handleDeletePerson = (id) => {
    const foundPerson = persons.find((person) => person.id === id);
    const confirmDeletion = window.confirm(`Delete ${foundPerson.name} ?`);
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
          if (
            error.response.data.error ===
            "Person's phonebook info is already deleted"
          ) {
            setPersons(personWithDeletedPerson);
          }
          console.log(error.response.data.error);
          setNotification({
            message: error.response.data.error,
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
