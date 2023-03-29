import React from "react";
import s from "./Header.module.css";
import logo_head from "../images/header_logo.png"

function Header ({todo,setTodo}){

    let compCount = 0;
    let count = todo.length;
    todo.map(item=>{
        if(item.status==3){
            compCount++;
            
        }
        
    })
    console.log(count, compCount);
    let t ="";
    compCount != 0 ?
        t = (compCount/count)*100+"%":
        t = "0px";
    
    
    console.log(t, typeof t);
    const head= {
        width : t,
        height: "100%", 
        backgroundColor: "#E48700",
        borderRadius:"10px",
        transition: "0.5s"
    }

 
    return (
        <div className={s.header}>
            <img className={s.logo_img} src={logo_head}></img>
            <div className={s.progress_back}>
                <div  className={s.progress} style={head} >
                </div>
            </div>

        </div>
    )
}

export default Header;