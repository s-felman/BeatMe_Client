import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "../../general/navBar";
//import { Box } from "@material-ui/core";
import { getUserAction } from "../../../actions/usersActions";
import { getCompAction } from "../../../actions/compActions";
import { updateAction, getPartAction } from "../../../actions/participantAction"
import "./competitionsUser.css";
import Moment from 'moment';


const OneTaskParticipant = (props) => {
    const [disable, setDisable] = useState(false);
    const [finish, setFinish] = useState("");

    useEffect(() => {
        if (props.user.userName === null) {
             props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)}
        if (props.competitionActive === undefined) {
            props.getCompAction(props.match.params.id)    
        }
        
        props.getPartAction(JSON.parse(localStorage.getItem("user"))._id, props.match.params.id)                       
        // eslint-disable-next-line
    }, [])

    Moment.locale('en');
    var dt = props.comp.targetDate;
    var image = `http://localhost:3000/${props.comp.image}`

    useEffect(()=>{
        debugger
        if(props.part.score !== 0){
             setDisable(true)   
            setFinish("!!כבר הגשת נתונים לתחרות זו. תודה על ההשתתפות")  
        } 
    },[disable, props.part.score])

    const style = {
        backgroundImage: `url(${image})`,
        width: "1096px",
        height: "400px",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: "-77px"
    }
 
    const sendProps = () => {
        updateAction(props.user._id, props.comp._id, [], 100)
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
                    <div style={style} />
                    <div className="participants-target">
                        <div className="comp-label-target-text">תאריך סיום</div>
                        <div className="participants-target-details-date" > {Moment(dt).format('DD-MM-yyyy')}
                        </div>
                    </div>
                </div >
                
                <button className="comp-answer-text2" disabled={disable} onClick={sendProps}>!!!סיימתי</button>
                <span className="comp-label-target-span">{finish}</span>
            </div>
            {/* <div className="comp-mark">
            </div> */}
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

export default connect(mapStateToProps, { getUserAction, getCompAction, getPartAction })(OneTaskParticipant);
//https://www.npmjs.com/package/react-calendar
