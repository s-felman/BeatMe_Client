import React, { useState, useEffect, Component } from "react"
import './App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/general/homepage'; 
import SignUp from "./components/users/signUp";
import Create from "./components/manager/create";
// import Edit from "./components/manager/edit";
import userLogin from "./components/users/userLogin"
import Participant from "./components/participant/participant";
// import CreateProps from "./components/competitions/createProps";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import OneTask from "./components/competitions/oneTask";
// import Votes from "./components/competitions/votes";
// import Trivia from "./components/competitions/trivia";
// import MultiTasks from "./components/competitions/multiTasks";
// import Team from "./components/competitions/team";
// import UpdateUser from "./components/user/updateUser";


function App() {
  useEffect(()=>{
    // localStorage.setItem('isLogged', false)
    // localStorage.setItem('user', undefined)
  },[])
  return (
    <div className="App">
  <Switch>
    <Route exact path="/" component={HomePage} />    
    <Route path="/create/:id" component={Create} />
    <Route exact path="/signup" component={SignUp}/>    
    <Route path="/userlogin" component={userLogin} />    
    <Route  path="/participant/:id" component={Participant}/>  
    <Route path="/participant/:userName" component={Participant} />
    {/*<Route path="/edit" component={Edit} />

    <Route path="/team/:cname" component={Team}/>


    <Route path="/createprops" component={CreateProps} />
    <Route path="/multitasks/:cname" component={MultiTasks} /> 
    <Route path="/onetask/:cname" component={OneTask} />
    <Route path="/trivia/:cname" component={Trivia} />
    <Route path="/votes/:cname" component={Votes} />
  
    <Route path="/updateUser" component={UpdateUser} /> */}
  </Switch>

    </div>
  );
}

export default App;
