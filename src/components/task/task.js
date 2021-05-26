import React from 'react';

import styles from './task.module.css';

const task = (props) => {
    let date1 = props.task.task_date.split("-");
    console.log("Task ",date1)
    let date = date1[2] + "/" + date1[1] + "/" + date1[0]
    return(<div className={styles.Task}>
        <img src={props.task.user_icon} alt="User"></img>
        <div className={styles.Details}>
            <span className={styles.task_msg}>{props.task.task_msg}</span>
            <span>{date}</span>
        </div>
        <div className={styles.editOptions}>
        <i className={"fas fa-pen"} onClick={() => props.editTypeHandler("edit", props.task.id)} ></i>
        <div className={styles.Button}>
            <i className="fas fa-bell"></i>
            <i className="fas fa-check" onClick={(event)=>{
                let res=alert("Mark this task as complete!");
                console.log(event)
            }}></i>
        </div>
        </div>
    </div>)
}

export default task;