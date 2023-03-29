import react, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPhone, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';


function TodoList({todo,setTodo}) {
    
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');



    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!= id);
        setTodo(newTodo);
        console.log(todo);
        
    }

    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if (item.id == id) {
                if (item.status == 1 || item.status == 2) {
                    item.status += 1;
                }
            }
            return item
        });
        setTodo(newTodo);
        console.log(todo);
    }

    function editTodo(id, title, description) {
        setEdit(id);
        setValue(title);
        setDescription(description);
    }


    function saveTodo(id) {/*
        let newTodo = [...todo].map(item => {
            if (item.id == id) {
                item.title = value;
                item.status += 1;
            }
            return item
        });
        setTodo(newTodo);
        console.log(todo);*/
        
    }

    return (
        <div className='status_diplay'>
            <div className = 'first_status'>
                <h3>TO DO</h3>
                {
                    todo.map((item)=> (
                            <div key={item.id} className = 'statuss' > 
                                {
                                    item.status ==1 &&
                                        <div className = 'first' >
                                            <div className='todo_list'>
                                                <span className='title'>{item.title}</span>
                                                <span className='description'>{item.description}</span>
                                            </div>

                                            <div className='todo_buttons'>
                                                <button onClick={() => deleteTodo(item.id)} className = 'delete_button'><FontAwesomeIcon icon={faTrashCan}/></button>
                                                <button onClick={() => statusTodo(item.id)} className = 'next_button'><FontAwesomeIcon  icon={faArrowRight} /></button>
                                                
                                            </div>
                                        </div> 
                                }
                            </div>
                    ))
                }
            </div>
            <div className = 'first_status'>
                <h3>IN PROGRESS</h3>
                {
                    todo.map((item)=> (
                            <div key={item.id} className = 'statuss' > 
                                {
                                    item.status ==2 &&
                                        <div className = 'first' >
                                           
                                            <div className='todo_list'>
                                                <span className='title'>{item.title}</span>
                                                <span className='description'>{item.description}</span>
                                            </div>

                                            <div className='todo_buttons'>
                                                <button onClick={() => deleteTodo(item.id)} className = 'delete_button'><FontAwesomeIcon icon={faTrashCan}/></button>
                                                <button onClick={() => statusTodo(item.id)} className = 'next_button'><FontAwesomeIcon  icon={faArrowRight} /></button>
                                                
                                            </div>
                                        </div> 
                                }
                            </div>
                    ))
                }
            </div>
            <div className = 'first_status'>
                <h3>COMPLETED</h3>
                {
                    todo.map((item)=> (
                            <div key={item.id} className = 'statuss' > 
                                {
                                    item.status ==3 &&
                                        <div className = 'first' >
                                           
                                            <div className='todo_list'>
                                                <span className='title'>{item.title}</span>
                                                <span className='description'>{item.description}</span>
                                            </div>

                                            <div className='todo_buttons'>
                                                <button onClick={() => deleteTodo(item.id)} className = 'delete_button'><FontAwesomeIcon icon={faTrashCan}/></button>
                                                
                                                
                                            </div>
                                        </div> 
                                }
                            </div>
                    ))
                }
            </div>
            
        </div>
    );
}
export default TodoList;
