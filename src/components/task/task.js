import React from 'react';
import image from '../../../src/assets/favicon.ico';

import styles from './task.module.css';

const task = (props) => {
    let date1 = props.task.task_date.split("-");
    console.log("Task ",date1)
    // let year =  props.task.task_date.splice(0, 4);
    // let month = props.task.task_date.getMonth().splice(1, 2) + 1;
    // let day= props.task.task_date.getDate().splice(1,2);
    let date = date1[2] + "/" + date1[1] + "/" + date1[0]
    return(<div className={styles.Task}>
        <img src={props.task.user_icon} alt="Image"></img>
        <div className={styles.Details}>
            <span className={styles.task_msg}>{props.task.task_msg}</span>
            <span>{date}</span>
        </div>
        <div className={styles.editOptions}>
        <i className={"fas fa-pen"} onClick={() => props.editTypeHandler("edit", props.task.id)} ></i>
        {/* <button className={styles.Button} onClick={() => props.editTypeHandler("edit", props.task.id)}>Edit</button> */}
        <div className={styles.Button}>
            <i className="fas fa-bell"></i>
            <i className="fas fa-check" onClick={(event)=>{
                let res=alert("Mark this task as complete!");
                props.saved(event,res)
            }}></i>
        </div>
        </div>
        

            {/* <input type='text' defaultValue={props.task.task_msg} />
            <input type='text' defaultValue={props.task.task_date}/>
            <input type='text' defaultValue={props.task.task_time} />
            <button onClick={() => props.editTypeHandler("edit", props.task.id)}>Edit</button> */}
            {/* <button onClick={(event) => props.completedHandler(event, task.id)}>Is Completed</button> */}
    </div>)
}

export default task;