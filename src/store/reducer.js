import * as actionTypes from './actions';

const initialState = {
    user: 'user_979f2358c7554c809d0d688943b8966b',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE2MTg1ODEsIm5iZiI6MTYyMTYxODU4MSwianRpIjoiZWVhMDIxMjMtNDg1MC00ZjJhLTg0YzEtYmM2ZjgxYTZiYzdkIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiAyMyBUZXN0aW5nIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl85NzlmMjM1OGM3NTU0YzgwOWQwZDY4ODk0M2I4OTY2YiIsImNvbXBhbnlfaWQiOiJjb21wYW55X2RmMTUzNTU4NGE4YzRjNmE5OGZjOTM5Y2UxMDVjMWE2IiwiaWNvbiI6Imh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvYWRlNTIwN2Q1YjQyYzVkYTU5NWVkZDc4MTg5ZDc3MTciLCJieV9kZWZhdWx0Ijoib3V0cmVhY2gifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.dU1KnrYa9d56nsZq6_9DZoDzZ5eP1WTFuvr2O_K7tQI',
    taskList: [],
    userList: []
}

const taskReducer = (state=initialState, action) =>{
    switch (action.type){
        case actionTypes.LOGIN:
            console.log("Reducer", action.getToken.results.token)
            console.log("Reducer", action.getUserId.results.id)
            return{
                ...state,
                token: action.getToken.results.token,
                user: action.getUserId.results.id
            }
        case actionTypes.GET_ALL_TASKS:
            const sortedTaskList=action.tasks.sort((a,b)=> {
                console.log((Date.parse(new Date(b.task_date)) + b.task_time) - (Date.parse(new Date(a.task_date)) + a.task_time))
                return (Date.parse(new Date(b.task_date)) + b.task_time) - (Date.parse(new Date(a.task_date)) + a.task_time)
            })
            // const sortedList = action.tasks.sort((a, b) => b.task_date > a.task_date && b.task_time > a.task_time)
            return{
                ...state,
                taskList: sortedTaskList,
            }
        case actionTypes.GET_USERS:
            const userList = action.users.filter(user => user.user_status === "accepted")
            console.log(userList)
            return{
                ...state,
                userList: userList
            }
        default:
            return state;
        }
}

export default taskReducer;