import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "../../general/navBar";
//import { Box } from "@material-ui/core";
import { getUserAction } from "../../../actions/usersActions";
import {getCompAction } from "../../../actions/compActions";
import {updateAction ,getPartAction} from "../../../actions/participantAction";
import notebook from "../../../static/images/notebook-long.png"
import "./competitionsUser.css";
import moment from 'moment';

const MultiTasksParticipant = (props) => {


  useEffect(() => {
    if (props.user.userName === null) {
      props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
    }      
    if(props.competitionActive===undefined){
      props.getCompAction(props.match.params.id)
    }
      props.getPartAction(JSON.parse(localStorage.getItem("user"))._id, props.match.params.id)                     
    // eslint-disable-next-line
  },[])

  moment.locale('en');
  var dt = props.comp.targetDate;
  var image= `http://localhost:3000/${props.comp.image}`;


  function dateCompare(date1, date2) {
    const now= new Date(moment().format("MM-DD-YYYY 00:00:00"))
    date1.setHours(0, 0, 0, 0)
    date2.setHours(0, 0, 0, 0)
    if(now >= date1 && now >= date2){
        if (now.getTime()-date1.getTime() > now.getTime()-date2.getTime()) {
       return date2
      } else  {
      return date1
      }
    }
    if (now < date1 && now >= date2)
      return date2
    if (now >= date1 && now < date2)
      return date1
    else{
      return date1
    }
    
 }

 var task;
 if(props.part.competitionId!==null){
    var dtTask=new Date(props.part?.typeProps[0].date)
    task=props.part.typeProps[0]
    for(var i=1; i<props.part?.typeProps.length; i++){
   dtTask=dateCompare(dtTask, new Date(props.part.typeProps[i].date))
   const date1 = new Date(props.part?.typeProps[i].date);
   date1.setHours(0, 0, 0, 0)
   if(date1.getTime()===dtTask.getTime())
    task=props.part.typeProps[i];
 }
 }
 const [disable, setDisable] = useState();

 useEffect(()=>{
  if(task !== undefined)
  if(task.state)
    setDisable(true) 
   
},[disable, task])
 
 const style={
  backgroundImage: `url(${image})`,
  width: "997px",
  height: "363px",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: "-77px"
 }

 const sendProps = (checked) => {
  checked? props.part.score=props.part.score+10:props.part.score=props.part.score-10;
  for(var i=0; i<props.part.typeProps.length; i++){
    if( props.part.typeProps[i].lowTarget===task.lowTarget){
      props.part.typeProps[i].state=checked;  
      // return
    }
  }
  
  updateAction(props.user._id, props.comp._id, props.part.typeProps, props.part.score)
}

  return (
    <div className="participants-style">
      <NavBar className="participants-nav"></NavBar>
      <div className="participants-details">
        <div className="comp-father-div">
          <h1 className="comp-header-secondpage">{props.comp.compName}</h1>
          <div> <Link to={`/participant/${props.user._id}`}>  
          <button className="props-button">חזור</button></Link>
          </div>
          <div className="comp-label-target-details">{props.comp.details}</div>
          <div style={style}  />
          <div className="mt-participants-target">
            <div className="comp-label-target-text">יעד סופי</div>
            <div className="participants-target-details-date" > {moment(dt).format('DD/MM/yyyy')}</div> 
            <div className="comp-label-target-day">{props.comp.target}</div>
            
          </div>
          <div className="comp-answer-date2 mt-finish">
          <div className="comp-answer-texts">עמדתי במשימה היומית</div>
          <input type='checkbox' className="comp-multTask-checkbox2" id="answerMaltTask" 
         onChange={(e)=>{setDisable(!disable); sendProps(!disable); }}  checked={disable} />
          </div>
          </div >
        </div>
      <div className="comp-mark">
        <div className="comp-label-target-date">המשימה היומית</div> 
        <div className="participants-target-details-date" > {moment(dtTask).format('DD/MM/yyyy')} 
        <img className="img-comp-mark" src={notebook} alt="img"/>
        </div>
        <div className="comp-label-target-details2" > {task!==undefined? task.details:""} 
        </div>
          <div className="comp-answer-date">
          <label className="comp-answer-text">עמדתי במשימה</label>
          <input type='checkbox' className="comp-multTask-checkbox" id="answerMaltTask" 
             onChange={(e)=>{sendProps(!disable); setDisable(!disable)}} checked={disable} />
          </div>
        </div>
      <div className="participant-profile">
                <div className="participant-profile-bg">
                    <div className="comp-user">
                        <div className="comp-userName">{props.user.userName}</div>
                    <img src={"http://localhost:3000/" + props.user.image} className="comp-userImage" alt="img" />
                    </div>
                    
                    <div className="comp-points">
                        <div className="comp-points-text">יש לך
                        <div className="comp-points-num">{props.part !== undefined ? props.part.score : 0} </div>
                        נקודות</div>
                    </div>
                </div>
            </div> 
    </div>)
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userActive,
    comp: state.comp.competitionActive,
    part: state.part.participant
  }
}

export default connect(mapStateToProps, {getUserAction, getCompAction,getPartAction } )(MultiTasksParticipant);
//https://www.npmjs.com/package/react-calendar
