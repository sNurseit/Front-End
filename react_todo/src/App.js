import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/Todolist/TodoList';
import back from '../src/components/images/123.png'


function App() {
 
  const [todo, setTodo] = useState([]);
  

  return (
    <div className="App">
      <img src={back} className='back'></img>
      <Header  todo = {todo} setTodo={setTodo}/>
      <AddTodo todo = {todo} setTodo={setTodo}/>
      <TodoList todo = {todo} setTodo={setTodo}/>
    </div>
  );
}

export default App;
