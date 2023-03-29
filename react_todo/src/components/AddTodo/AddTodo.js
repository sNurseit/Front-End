import React, {useState} from 'react';
import {v4 as uuid} from "uuid"
import s from "./AddTodo.module.css"

function AddTodo({todo, setTodo}) {

    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [done, setDone] = useState(true);
  
    function modalOpen(){
        setDone(false);
    }
    function modalClose(){
        setDone(true);
    }
    
    
    function saveTodo() {
        if(value){
            setTodo(
                [...todo, {
                    id: uuid(),
                    title: value,
                    description: description,
                    status: 1
                }]
    
            )
            setValue('')
            setDescription('')
            
        }
        
    }
    return (
        
        <div className='AddTodo'>
            {
                done ==true ?
                <div className={s.op_div}>
                    <button className={s.open_modal} onClick={modalOpen}>
                        ADD
                    </button>
                </div>
                
                :
                <div>
                    <div className={s.op_div}>
                        <button className={s.open_modal}  onClick={modalOpen}>
                            ADD
                        </button>
                    </div>
                    <div className={s.modal}>
                        <div className={s.modalContent}>
                            <div className={s.closeModal}>
                                <button className={s.close}  onClick={modalClose} >X</button>
                            </ div >
                          
                            <p className={s.title_text}>
                                Title:
                            </p>
                            <input className={s.input_title}  value={value} onChange={(e) =>setValue(e.target.value)}  />
                           
                            <p className={s.title_text}>
                                Description:
                            </p>
                            <textarea className={s.input_description} value={description} onInput={(e) =>setDescription(e.target.value)}  />
                            <div className={s.save_div}>
                                <button className={s.save_button} onClick={saveTodo}>ADD</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
        
        
    )
}

export default AddTodo;