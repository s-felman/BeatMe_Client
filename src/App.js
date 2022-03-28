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
import LiveTrivia from "./components/manager/live competitions/trivia";
import MultiTasksParticipant from './components/participant/competitionsParticipant/multiTask';
import VotesParticipant from './components/participant/competitionsParticipant/votes';
import TriviaParticipant from './components/participant/competitionsParticipant/trivia';
import OneTaskParticipant from './components/participant/competitionsParticipant/oneTask';
import Competitions from './components/general/competitions';

function App() {

  useEffect(()=>{
    if (localStorage.getItem('isLogged')!=='true'){
        localStorage.setItem('isLogged', "false")
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
    <Route path="/competitions" component={Competitions} />   
    <Route path="/manager" component={AllComp}/>
    <Route path="/team/:cname" component={Team}/>
    <Route path="/createprops" component={CreateProps} />
    <Route path="/multitasks/:cname" component={MultiTasks} /> 
    <Route path="/onetask/:cname" component={OneTask} />
    <Route path="/trivia/:cname" component={Trivia} />
    <Route path="/votes/:cname" component={Votes} />
    <Route path="/updateUser" component={UpdateUser} />
    <Route path="/livetrivia/:id" component={LiveTrivia} />
    
    <Route exact path="/participant/multitasks/:id" component={MultiTasksParticipant}/>
    <Route exact path="/participant/onetask/:id" component={OneTaskParticipant}/>
    <Route exact path="/participant/votes/:id" component={VotesParticipant} />
    <Route exact path="/participant/trivia/:id" component={TriviaParticipant} />
    <Route exact path="/participant/:id" component={Participant}/>
  </Switch>

    </div>
  );
}

export default App;
