import React , { Component } from 'react';
import styles from './App.module.css';
import { connect } from 'react-redux';

import Tasks from './container/Tasks/Tasks';
import * as actionTypes from './store/actions';

class App extends Component{
  /* componentDidMount() {
    fetch("https://stage.api.sloovi.com/login",{
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',          
      },
      body : JSON.stringify({
          email : 'smithcheryl@yahoo.com',
          password : '12345678',
        })
    })
      .then(response => {
        if(response.ok){
          // console.log(response.json())
          return response.json();
        }
        else{
          response.json().then((err) => {
            throw new Error(err);
          })
        }
      })
      .then(res =>{
        fetch("https://stage.api.sloovi.com/user",{
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + res.results.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
          }
        })
        .then(response => {
          // console.log(response)
          response.json().then(data => {
            // console.log(res, data)
            this.props.onLogin(res, data)})
        })
        // this.props.onLogin(res)
      })
      .catch(error => {
        alert(error);
      })
  } */
  render(){
    return (
      <div className={styles.App}>
        {/* <button >Login</button> */}
        <Tasks/>
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch =>{
  return{
    onLogin: (token, userId) => dispatch({type: actionTypes.LOGIN, getToken: token, getUserId: userId})
  }
}

export default connect(null,mapDispatchToProps)(App);
