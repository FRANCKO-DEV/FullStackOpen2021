import React, { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import Notification from './components/Notification'
import './index.css'

const App = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState(null)
    const [typeMsg, setTypeMsg] = useState(null)

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response =>{
                setPersons(response.data)
            })
    }, [])

    const handleName = (e) =>{
        e.preventDefault()
        setNewName(e.target.value)
    }
    const handleNumber = (e) =>{
        e.preventDefault()
        setNewNumber(e.target.value)
    }
    

    
//add new data
    const addName = (e) =>{
        e.preventDefault()

         

        if (persons.find(val => val.name === newName )){
            window.confirm(`${newName} exist already`)

            const idup=  ListFilter.filter(val=>val.name===newName)[0].id

            const findObj= persons.find(val=>val.id===idup)
            const edit={ ...findObj, number: newNumber}

            axios.put(`http://localhost:3001/persons/${idup}`, edit)
                .then(response => {
                    setPersons(persons.map(person => person.id===idup? {...edit, id: idup}: persons))
                    
                    setNewName('')
                    setNewNumber('')

            })

        } else {

            const newObject = {
                id: persons.length + 1 ,
                name: newName,
                number: newNumber
            }
            axios
                .post('http://localhost:3001/persons', newObject)
                
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setTypeMsg('agree')
                    setMsg(`Added ${newObject.name}`)
                    console.log('le nom',newObject.name);
                    setTimeout(() => {
                      setMsg(null)
                      setTypeMsg(null)
                    }, 5000)
            

            })
        }        
    }

    

    //filter data
    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    const ListFilter=(search.length===0? persons: persons.filter(val=> val.name=== search.toLowerCase()))
    console.log(ListFilter);

    const List = ListFilter.map(val => <div key={val.id}>{val.name} {val.number} <button onClick={()=> handleRemove(val.id)}>delete</button></div>)
 
    //remove
    const handleRemove = (id) =>{
        const index = persons.findIndex(val => val.id===id)
        console.log('id ',persons[index].id);

        axios
            .delete('http://localhost:3001/persons/'+persons[index].id)
                    
            .then(res => {
                setTypeMsg('error')
                setMsg(`Information of ${persons[index].name} has already been removed from server`)
                console.log('name',persons[index].name)
                setTimeout(() => {
                  setMsg(null)
                  setTypeMsg('error')
                }, 5000)
                //update
               
                setPersons(persons.filter(val => val.id  !== persons[index].id))
        })
    }

    return (
        <div>
            <h1>Phonebook</h1>

            <Notification msg={msg} typeMsg={typeMsg} />

            <Filter change={handleSearch} />
            <br />
            <h3>Add a new</h3>
            <PersonForm 
                submit={addName} 
                name={newName}
                number={newNumber}
                changeOne={handleName}
                changeTwo={handleNumber}
            />
            <h3>Numbers</h3>
            <Persons List={List} />
        </div>
    )
}

export default App
