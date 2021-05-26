import React from 'react';
import { connect } from 'react-redux';
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

    let userList = []
    console.log("Task Editor Users", props.users);
    if (props.users){
        userList= props.users.map(user => {
            return <option key={user.id} value={user.id}>{user.name}</option>
    })
    }
    return(
        <div>
            <form className={styles.TaskEditor}>
                <div className={styles.TaskLabel}>
                    <label htmlFor="task_msg">Task Description</label>
                <input id="task_msg" type='text' onChange={(event)=>props.descHandler(event)}
                onFocus={(event)=>{
                    event.target.select()
                }} autoFocus value={props.taskDetails.task_msg}/>
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
                <select id="user" defaultValue={props.taskDetails.assigned_user} onChange={user => props.userAssignHandler(user)}>
                    {userList}
                </select>
                </div>
                </div>
                <div className={styles.Buttons} style={buttonDirection}>
                    <i className="far fa-trash-alt" onClick={props.deleteHandler} style={showDelete}></i>
                    <div className={styles.SaveCancel}>
                    <span onClick={props.cancelled}>Cancel</span>
                    <button className="btn btn-success" type="submit" onClick={props.saved}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        users: state.userList
    }
}

export default connect(mapStateToProps)(taskEditor);