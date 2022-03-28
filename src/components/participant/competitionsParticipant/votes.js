import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "../../general/navBar";
//import { Box } from "@material-ui/core";
import { getUserAction } from "../../../actions/usersActions";
import {getCompAction, addScoreAction} from "../../../actions/compActions";
import {updateAction ,getPartAction} from "../../../actions/participantAction";
import heart from "../../../static/images/icon-heart.png"
import "./competitionsUser.css";

const VotesParticipant = (props) => {
  const [disable, setDisable] = useState(false);
  const [checked, setChecked] = useState("");
  const [item, setItem]= useState("");
  const [end, setEnd] = useState(false)
  const [finish, setFinish] = useState("");

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

  useEffect(()=>{
    if(props.part.score !== 0){
      var i=props.part.score;
      setChecked(props.part.typeProps[i]?._id)
      setEnd(true)   
      setFinish("!!כבר הגשת נתונים לתחרות זו. תודה על ההשתתפות")
    }
  },[props.part.score, props.part.typeProps])

   if(props.comp.typeProps!==null){
   var lists=props.comp.typeProps.map(p => {
        return (
          <div className={checked===p._id ? "votes-p-div-checked":"votes-p-div"}>
            <img className="votes-p-img" src={"http://localhost:3000/" + p.image} alt="img"></img>
            <div className="votes-p-div1">
              <div className="votes-p-name">{p.itemName}</div>
              <div className="votes-p-details">{p.itemDetails}</div>
              <button className="votes-p-button" onClick={()=>{setDisable(true); setItem(p._id)}} > הצבעה </button>
            </div>
            <img src={heart} className="icon-heart" alt="img"
             onClick={()=>{checked!==p._id?setChecked(p._id): setChecked('')}}/>
          </div>
        )
      })  
   }
  var image= `http://localhost:3000/${props.comp.image}`;
   
   const style={
    backgroundImage: `url(${image})`,
    width: "997px",
    height: "363px",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: "-77px"
   }

   const sendProps = () => {
    var i;
    for( i=0 ;i<props.part.typeProps.length; i++){
      if(props.part.typeProps[i]._id===checked){
        break;
      }
    }
    updateAction(props.user._id, props.comp._id, props.part.typeProps, i)
  }

  return (
    <div >
    <div className={disable?"overlay": ""}>
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
          <div className="participants-target">
            <div className="comp-label-target"></div>
            <div className="comp-v-target">{lists}</div>
          </div>
          <div className="flex-end">
          <span className="comp-label-target-span">{finish}</span>
          <button className="comp-answer-text2" onClick={sendProps} disabled={end}>!!!סיימתי</button>
          </div ></div>
        </div>
      {/* <div className="comp-mark">
        <div className="comp-label-target-date">המשימה היומית</div> 
        <div className="participants-target-details-date" > 
        </div>
      </div> */}
      <div className="participant-profile">
                  <div className="participant-profile-bg">
                      <div className="comp-user">
                          <div className="comp-userName">{props.user.userName}</div>
                      <img src={"http://localhost:3000/" + props.user.image} className="comp-userImage" alt="img" />
                      </div>
                  </div>
              </div> 
      </div>
      </div>
    <div className={disable?"score-window": "none"}>
      <div className="score-text"> ??איך אתה מדרג</div>
      <button className="score-button1" onClick={()=>{setDisable(false); addScoreAction(props.comp._id,item,10)}}>10</button>
      <button className="score-button2" onClick={()=>{setDisable(false); addScoreAction(props.comp._id,item,20)}}>20</button>
      <button className="score-button3" onClick={()=>{setDisable(false); addScoreAction(props.comp._id,item,30)}}>30</button>
      <div className="votes-p-details">בנוסף לניקוד , אפשר לבחור בפריט המנצח </div>
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

export default connect(mapStateToProps, {getUserAction, getCompAction, getPartAction} )(VotesParticipant);
//https://www.npmjs.com/package/react-calendar