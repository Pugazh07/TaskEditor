import React from 'react';
import styles from './taskEditor.module.css';

import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const taskEditor = (props) => {
    console.log("TaskEditor entered ", props.taskDetails)
    console.log("User ",props.taskDetails.assigned_user)
    let showDelete = {}
    let buttonDirection={}
    if(!props.deleteHandler){
        showDelete = {
            display: "none"
        }
        buttonDirection={
            flexDirection: "row-reverse"
        }
    }
    return(
        <div>
            <form className={styles.TaskEditor}>
                <div className={styles.TaskLabel}>
                    <label htmlFor="task_msg">Task Description</label>
                <input id="task_msg" type='text' onChange={(event)=>props.descHandler(event)} value={props.taskDetails.task_msg}/>
                </div>
                <div className={styles.DateTime}>
                    <div className={styles.TaskLabel}>
                    <label htmlFor="task_date">Date</label>
                    <i className="far fa-calendar-alt"></i>
                    <DatePicker id="task_date" className={styles.DatePicker} selected={props.taskDetails.task_date} onChange={date => props.dateHandler(date)} />
                    </div>
                    <div className={styles.TaskLabel}>
                    <label htmlFor="task_time">Time</label>
                    <i className="far fa-clock"></i>
                    <TimePicker id="task_time" step={30} className={styles.TimePicker} onChange={(time) => props.timeHandler(time)} value={props.taskDetails.task_time}/>
                    </div>
                </div>
                <div>
                <div className={styles.TaskLabel}>
                <label htmlFor="user">Assign User</label>
                <select id="user">
                    <option value={props.taskDetails.assigned_user}>{props.taskDetails.assigned_user}</option>
                </select>
                </div>
                </div>
                <div className={styles.Buttons} style={buttonDirection}>
                    <i className="far fa-trash-alt" onClick={props.deleteHandler} style={showDelete}></i>
                    {/* <button onClick={props.deleteHandler} style={showDelete}>Delete</button> */}
                    <div className={styles.SaveCancel}>
                    <span onClick={props.cancelled}>Cancel</span>
                    <button className="btn btn-success" type="submit" onClick={props.saved}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default taskEditor;