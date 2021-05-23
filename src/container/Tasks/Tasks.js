import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Tasks.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import * as actionTypes from '../../store/actions';
import TaskEditor from '../../components/taskEditor/taskEditor';
// import Task from '../../components/task/task';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker';
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
            newState.task_msg="Follow up"
            newState.task_date = date
            newState.task_time = timeInSeconds
            newState.is_completed= 0
            newState.assigned_user=this.props.user;
        }
        if(type === "edit"){
            console.log("Edit task", task_id)
            const selectedTask = this.props.taskList.filter(task => task.id === task_id)
            console.log(selectedTask)
            newState.task_msg = selectedTask[0].task_msg;
            newState.task_date = new Date(selectedTask[0].task_date);
            newState.task_time = selectedTask[0].task_time;
            newState.is_completed = selectedTask[0].is_completed;
            newState.assigned_user = selectedTask[0].assigned_user;
            newState.refresh = this.props.pageRefresh;
        }
        this.setState({...newState, id: task_id});
    }
    descHandler = (event) =>{
        this.setState({
            task_msg: event.target.value
        })
    }
    dateHandler = (date) => { this. setState({task_date: date})}
    timeHandler = (time) => { this.setState({task_time: time})}
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
        fetch("https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598"+ task_id,{
            method: method,
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assigned_user:  this.props.user, 
                task_date: date,
                task_time: this.state.task_time,
                is_completed: this.state.is_completed,
		        time_zone: 19800,
                task_msg: this.state.task_msg
            })
        }).then(response=>{
            console.log(response)
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
        fetch("https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598",{
            method: 'GET',
            headers:  {
            'Authorization': 'Bearer ' + this.props.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response)
            response.json().then(data=>{
                    console.log(data.results)
                    this.props.onGetAllTask(data.results)
            })
        })
    }

    componentDidMount=()=>{
        this.getAllTasks();
    }
    render(){
        console.log("Tasks.js ", this.state)
        let taskEditor = null;
        if(this.state.type === "new"){
            taskEditor = <TaskEditor taskDetails={this.state}
                descHandler={this.descHandler}
                dateHandler={this.dateHandler}
                timeHandler={this.timeHandler}
                saved={this.taskSaveHandler}/> ;
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
                                {/* <input type='text' defaultValue={task.task_msg} />
                                <input type='text' defaultValue={task.task_date}/>
                                <input type='text' defaultValue={task.task_time} />
                                <button onClick={() => this.editTypeHandler("edit", task.id)}>Edit</button>
                                <button onClick={(event) => this.deleteHandler(event, task.id)}>Delete</button> */}
                                <Task editTypeHandler={this.editTypeHandler} saved={this.taskSaveHandler} task={task}/>
                            </div>
                    )}
                    // if(this.state.index === index)
                    else{
                        return(
                            <div key={task.id}>
                            <TaskEditor taskDetails={this.state}
                        descHandler={this.descHandler}
                        dateHandler={this.dateHandler}
                        timeHandler={this.timeHandler}
                        saved={this.taskSaveHandler}
                        cancelled={this.cancelHandler}
                        deleteHandler={this.deleteHandler}/>
                        </div>
                        )
                        }
                }
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        token: state.token,
        taskList: state.taskList,
        numOfTasks: state.maxId,
        showTaskEditor: state.showTaskEditor,
        pageRefresh: state.refresh
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetAllTask: (tasks) => dispatch({type: actionTypes.GETALL, tasks: tasks}),
        onAddTask: () => dispatch({type: actionTypes.ADD_TASK, task: {name: "Puagzh"}}),
        onDelTask: () => dispatch({type: actionTypes.DEL_TASK})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
// export default Tasks;