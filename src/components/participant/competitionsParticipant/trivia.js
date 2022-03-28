import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "../../general/navBar";
//import { Box } from "@material-ui/core";
import { getUserAction } from "../../../actions/usersActions";
import { getCompAction } from "../../../actions/compActions";
import { updateAction, getPartAction } from "../../../actions/participantAction";
import "./competitionsUser.css";
import { Radio } from "@material-ui/core";


const TriviaParticipant = (props) => {
    const [checked, setChecked] = useState('')
    const [disable, setDisable] = useState(false);
    const [finish, setFinish]= useState('שאלה הבאה');
    const [end, setEnd]= useState(false);    
    const [endText, setEndText]= useState(false);    

    useEffect(() => {
        if (props.user.userName === null) {
            props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
        }
        if (props.competitionActive === undefined) {

            props.getCompAction(props.match.params.id)
        }
        props.getPartAction(JSON.parse(localStorage.getItem("user"))._id, props.match.params.id);
        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        debugger
        if(props.part.score !== 0){
             setEnd(true)   
            setEndText("!!כבר הגשת נתונים לתחרות זו. תודה על ההשתתפות")  
        } 
    },[end, props.part.score])
    var image = `http://localhost:3000/${props.comp.image}`;

    const style = {
        backgroundImage: `url(${image})`,
        width: "997px",
        height: "363px",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: "-77px"
    }
    const [score, setScore] = useState(props.part !== undefined ? props.part.score : 0);

    if (props.comp.typeProps !== null) {
        var questions = props.comp.typeProps.map((p, index) => {
            return (
                <div className="">
                    <div className=""></div>
                    <div className="comp-t-aside-q">0{index + 1} שאלה</div>
                </div>
            )
        })
    }
    
    const [index, setIndex] = useState(0);
    
         // eslint-disable-next-line
    let answerBool=[false, false, false, false]//Array<Boolean>

    useEffect(()=>{

        if(answerBool[index]){
            setChecked(props.part.typeProps[index].checked)
        }
         // eslint-disable-next-line
    },[answerBool,index, props.part.typeProps])

    if (props.comp.typeProps !== null && props.part!==null) {

    const answers=props.part.typeProps;
    // answerBool.length=props.part.typeProps.length
    const answersFunc=()=>{
        if (index+2===props.comp.typeProps.length){
            setFinish('סיום')
            // setDisable(false)
        }
        else{
            setFinish('שאלה הבאה')
        }
        answers[index].checked=checked;

        if(answers[index].checked===props.comp.typeProps[index].checked && !answerBool[index]){
            setScore(score+10);
            setChecked('')
            answerBool[index]=true
        }
        else if(answers[index].checked!=='' && !answerBool[index]){
            setScore(score-10);
            setChecked('');
            answerBool[index]=true;
        }
    }

        var current = props.comp.typeProps[index] !== undefined ? props.comp.typeProps[index] : []
        var lists = (
            <div className="comp-t-div">
                <div className="comp-t-num-q">{index+1} שאלה</div>
                <div className="comp-t-target-details" >{current.question}</div>
                <div className="comp-t-div-radioButton">
                    <div className="comp-t-radios-button ">
                        <Radio className="comp-t-radio-button" type="radio" value="option1" name="gender"
                            onChange={(e) => { setChecked(e.target.value) }} checked={checked === 'option1'}></Radio>
                        <div className="comp-t-radio-select" >{current.option1}</div>
                    </div>
                    <div className="comp-t-radios-button ">
                        <Radio className="comp-t-radio-button" type="radio" value="option2" name="gender"
                            onChange={(e) => { setChecked(e.target.value) }} checked={checked === 'option2'}></Radio>
                        <div className="comp-t-radio-select">{current.option2}</div>
                    </div>
                    <div className="comp-t-radios-button ">
                        <Radio className="comp-t-radio-button" type="radio" value="option3" name="gender"
                            onChange={(e) => { setChecked(e.target.value) }} checked={checked === 'option3'}></Radio>
                        <div className="comp-t-radio-select">{current.option3}</div>
                    </div>
                    <div className="comp-t-add">
                    <button className="comp-t-add-qes" onClick={() => { 
                         finish==='סיום'? sendProps(): answersFunc(); setChecked(''); index+1<props.comp.typeProps.length?setIndex(index + 1):setIndex(index); }}>{finish}</button>
                    {/* <button className="comp-t-add-qes comp-t-add-qes2" onClick={() => { answersFunc();  index-1 >= 0?setIndex(index - 1):setIndex(index); 
                        setChecked(props.part.typeProps[index].checked);}}>שאלה קודמת</button>*/}
                    </div> 
                </div>
            </div>
        )
    }



    const sendProps = () => {
        debugger
        updateAction(props.user._id, props.comp._id, props.part.typeProps, score)
    }


    return (
        <div >
            <div className={disable ? "overlay" : ""}>
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
                                <div className="comp-t-more-q">יש לך {props.comp.typeProps!==null? props.comp.typeProps.length: ''}  שאלות</div>
                            </div>
                        </div >
                        <span className="comp-label-target-span">{endText}</span>
                        <button className="comp-answer-text2" disabled={end} onClick={() => {  setDisable(true) }}>כניסה לחידות</button>
                        
                    </div>
                    <div className="comp-mark">
                        <div className="comp-t-title-q">השאלות </div>
                        <div className="comp-t-aside" > {questions}
                        </div>
                        <div className="participants-target-details-date" >
                        </div>
                        {/* onChange={(e)=>answerMaltTask(e.comp.answerMaltTask)} */}
                    </div>
                    <div className="participant-profile">
                        <div className="participant-profile-bg">
                            <div className="comp-user">
                                <div className="comp-userName">{props.user.userName}</div>
                                <img src={"http://localhost:3000/" + props.user.image} className="comp-userImage" alt="img" />
                            </div>
                            <div className="comp-points">
                                <div className="comp-points-text">יש לך
                                    <div className="comp-points-num">{props.part !== null ? props.part.score : 0} </div>
                                    נקודות</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={disable ? "comp-t-window" : "none"}>
                {lists}
            </div>
        </div >)
}

const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        comp: state.comp.competitionActive,
        part: state.part.participant
    }
}

export default connect(mapStateToProps, { getUserAction, getCompAction, getPartAction })(TriviaParticipant);
//https://www.npmjs.com/package/react-calendar