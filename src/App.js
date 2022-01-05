import React, {  useEffect } from "react"
import './App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/general/homepage'; 
import SignUp from "./components/users/signUp";
import Create from "./components/manager/create";
import userLogin from "./components/users/userLogin";
import AllComp from "./components/manager/allCompetitions"
import Participant from "./components/participant/participant";
import CreateProps from "./components/manager/competitions/createProps";
import 'bootstrap/dist/css/bootstrap.min.css';
import OneTask from "./components/manager/competitions/oneTask";
import Votes from "./components/manager/competitions/votes";
import Trivia from "./components/manager/competitions/trivia";
import MultiTasks from "./components/manager/competitions/multiTasks";
import Team from "./components/manager/competitions/team";
import UpdateUser from "./components/users/updateUser";
import LiveTrivia from "./components/manager/live competitions/trivia"

function App() {

  useEffect(()=>{
    if (localStorage.getItem('isLogged')!=='true'){
        localStorage.setItem('type', "")
        localStorage.setItem('compName', "")
        localStorage.setItem('isLogged', "false")
        localStorage.setItem('user', "undefined")
    }

 },[])

  return (
    <div className="App">
  <Switch>
    <Route exact path="/" component={HomePage} />    
    <Route exact path="/create/:id" component={Create} />
    <Route exact path="/signup" component={SignUp}/>    
    <Route path="/userlogin" component={userLogin} />    
    <Route  path="/participant/:id" component={Participant}/>  
    <Route path="/participant/:userName" component={Participant} />
    <Route path="/manager" component={AllComp}/>
    <Route path="/team/:cname" component={Team}/>
    <Route path="/createprops" component={CreateProps} />
    <Route path="/multitasks/:cname" component={MultiTasks} /> 
    <Route path="/onetask/:cname" component={OneTask} />
    <Route path="/trivia/:cname" component={Trivia} />
    <Route path="/votes/:cname" component={Votes} />
    <Route path="/updateUser" component={UpdateUser} />
    <Route path="/livetrivia/:id" component={LiveTrivia} />
  </Switch>

    </div>
  );
}

export default App;
