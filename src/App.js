import React, { useState, useEffect } from 'react';
import {firestore} from './index'
import Task from './Task'

function App() {

const [tasks, setTasks] = useState([]) 

const [name, setName] = useState('')

useEffect(() => {
  Data()
}, [])

const deleteTask = (id)=> {
  firestore.collection("tasks").doc(id+'').delete()
}

const updateTask = (id)=> {
  firestore.collection("tasks").doc(id+'').set({id,name})
}


const Data = () => {
  firestore.collection("tasks").onSnapshot((snapshot) =>{
    console.log(snapshot.docs)
    let myTask = snapshot.docs.map(d => {
      const {id, name} = d.data()
      console.log(id, name)
      return {id, name }
    })
    setTasks(myTask)
  })
}


const renderTask = () => {
  if (tasks && tasks.length)
  return( 
    tasks.map((task,index) => {
      return(
        <Task key = {index} task ={task}
        deleteTask={deleteTask}
        updateTask={updateTask}
        />
      )
    })
  )
  else
      return (<li>No task</li>) 
}

const addTask = () => {
  let id =  ( tasks.length === 0)?1:tasks[tasks.length-1].id + 1 
  firestore.collection("tasks").doc(id+'').set({id, name})
}
 
  return (
    <center>
    <div >
      <h1>Natthapon</h1> 
      <input type="text" name="name" onChange={ (e) => setName(e.target.value)} />
      <button onClick= {addTask}> Submit</button>
      <ul style= {{ display:'flex', listStyle:'none' }}>{ renderTask() }</ul>
    </div>
    </center>
  );
}

export default App;