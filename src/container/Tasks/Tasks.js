import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Tasks.module.css'
import 'react-datepicker/dist/react-datepicker.css';

import * as actionTypes from '../../store/actions';
import TaskEditor from '../../components/taskEditor/taskEditor';
import Task from '../../components/task/task';

class Tasks extends Component {
    state={
        type: null,
        assigned_user: null,
        id: null,
        task_msg: '',
        task_date: '',
        task_time: '',
        is_completed: 0,
    }
    editTypeHandler=(type, task_id=null)=>{
        // const newState = JSON.parse(JSON.stringify(this.state));
        const newState = {}
        newState.type=type
        if(type === "new"){
            let date = new Date()
            let timeInSeconds= date.getHours()*3600 + date.getMinutes()*60;
            newState.task_msg="Your Task"
            newState.task_date = date
            newState.task_time = timeInSeconds
            newState.is_completed= 0
            newState.assigned_user=this.props.user;
        }
        if(type === "edit"){
            const selectedTask = this.props.taskList.filter(task => task.id === task_id)
            console.log(selectedTask)
            newState.task_msg = selectedTask[0].task_msg;
            newState.task_date = new Date(selectedTask[0].task_date);
            newState.task_time = selectedTask[0].task_time;
            newState.is_completed = selectedTask[0].is_completed;
            newState.assigned_user = selectedTask[0].assigned_user;
        }
        setTimeout(this.setState({...newState, id: task_id}),4000);
    }
    descHandler = (event) =>{
        this.setState({
            task_msg: event.target.value
        })
    }
    dateHandler = (date) => { this.setState({task_date: date})}
    timeHandler = (time) => { this.setState({task_time: time})}
    userAssignHandler = (user) => {
        this.setState({assigned_user: user.target.value});
    }
    taskSaveHandler=(event)=>{
        event.preventDefault();
        let year =  this.state.task_date.getFullYear();
        let month = (this.state.task_date.getMonth()+1).toString().padStart(2,0);
        let day= this.state.task_date.getDate().toString().padStart(2,0);
        let date = year + "-" + month + "-" + day;
        console.log("date ", date)
        let task_id = '';
        let method = "POST";
        if (this.state.type === "edit"){
            method = "PUT";
            task_id = "/" + this.state.id;
            console.log("url",task_id)
        }
        fetch("https://task-editor-b95e4-default-rtdb.firebaseio.com/tasks.json",{
            method: method,
            body: JSON.stringify({
                assigned_user:  this.state.assigned_user, 
                task_date: date,
                task_time: this.state.task_time,
                is_completed: this.state.is_completed,
		        time_zone: 19800,
                task_msg: this.state.task_msg
            })
        }).then(response=>{
            console.log("Save ", response)
            response.json().then(out => {
                console.log(out)
                this.setState({type: null,
                    assigned_user: null,
                    id: null,
                    task_msg: '',
                    task_date: '',
                    task_time: '',
                    is_completed: 0,})
                this.getAllTasks()
            })
        }).catch(err => {
            console.log(err)
        })
    }

    cancelHandler = () => {
        this.setState({type: null,
            assigned_user: null,
            id: null,
            task_msg: '',
            task_date: '',
            task_time: '',
            is_completed: 0,})
        this.getAllTasks();
    }

    deleteHandler = (event) => {
        event.preventDefault();
        let id = this.state.id;
        console.log("delete id " , id)
        fetch("https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/" + id , {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response)
            response.json().then(out => {
                console.log(out)
                this.getAllTasks()
            })
        })
    }

    getAllTasks = () =>{
        fetch("https://task-editor-b95e4-default-rtdb.firebaseio.com/tasks.json",{
            method: 'GET',
            // headers:  {
            // 'Authorization': 'Bearer ' + this.props.token,
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // }
        }).then(response => {
            console.log(response)
            response.json().then(data=>{
                    console.log(data)
                    this.props.onGetAllTasks(Object.values(data))
            })
        })
    }

    getAllUsers = () =>{
        fetch("https://stage.api.sloovi.com/team",{
            method: 'GET',
            headers:  {
            'Authorization': 'Bearer ' + this.props.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        }).then(response =>{
            response.json().then(res=>{
                console.log(res)
                this.props.onGetAllUsers(res.results)
            }).catch(err=>{
                console.log(err);
            })
        }).catch(error =>{
            console.log(error);
        })
    }

    componentDidMount=()=>{
        this.getAllTasks();
        // this.getAllUsers();
    }
    render(){
        console.log("Tasks.js ", styles)
        let taskEditor = null;
        if(this.state.type === "new"){
            taskEditor = <TaskEditor taskDetails={this.state}
                descHandler={this.descHandler}
                dateHandler={this.dateHandler}
                timeHandler={this.timeHandler}
                userAssignHandler={this.userAssignHandler}
                saved={this.taskSaveHandler}
                cancelled={this.cancelHandler}/> ;
            }
        return(
            <div className={styles.Tasks}>
                <div className={styles.TasksCounter}>
                    <div className={styles.TasksCount}>TASKS <span>{this.props.taskList.length}</span></div>
                    <div className={styles.TasksButton} onClick={()=>this.editTypeHandler("new")}>+</div>
                </div>
                {taskEditor}
                {this.props.taskList.map((task, index) => {
                    if(this.state.id !== task.id){
                        return(
                            <div key={task.id} >
                                <Task editTypeHandler={this.editTypeHandler} saved={this.taskSaveHandler} task={task}/>
                            </div>
                    )}
                    else if(this.state.type === "edit"){
                        return(
                            <div key={task.id}>
                                <TaskEditor taskDetails={this.state}
                                descHandler={this.descHandler}
                                dateHandler={this.dateHandler}
                                timeHandler={this.timeHandler}
                                userAssignHandler={this.userAssignHandler}
                                saved={this.taskSaveHandler}
                                cancelled={this.cancelHandler}
                                deleteHandler={this.deleteHandler}/>
                            </div>
                        )
                        }
                }
                    )}
                {/* <button>Post Users</button> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        token: state.token,
        taskList: state.taskList,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetAllTasks: (tasks) => dispatch({type: actionTypes.GET_ALL_TASKS, tasks: tasks}),
        onGetAllUsers: (users) => dispatch({type: actionTypes.GET_USERS, users: users})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
// export default Tasks;