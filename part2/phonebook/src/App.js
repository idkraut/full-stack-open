import React, { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

const PersonForm = ({name, number, handleNewName, handleNewNumber, handleAdd}) => {
  return (
    <form onSubmit={handleAdd}>
    <div>
      name: <input value={name} onChange={handleNewName}/>
    </div>
    <div>
      number: <input value={number} onChange={handleNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with<input value={value} onChange={onChange}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleInputChange = (handler) => (event) => {
    console.log(event.target.value)
    handler(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(({name}) => name === newName)) {
      return alert(`${newName} is already added to the phonebook`)
    }

    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newFilter
      ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleInputChange(setNewFilter)}/>
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNewName={handleInputChange(setNewName)}
        handleNewNumber={handleInputChange(setNewNumber)}
        handleAdd={addName}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
