import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getUserAction } from "../../../actions/usersActions"
import { getCompAction } from "../../../actions/compActions";
import "../competitions/competitions.css"
import NavBar from "../../general/navBar";
import { Radio } from "@material-ui/core";

const LiveTrivia = (props) => {

    const [typeProps, setTypeProps] = useState([]);
    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [change, setChange] = useState(false)
    const [add, setAdd] = useState('הוספה')
    const [save, setSave] = useState('')
    const [checked, setChecked] = useState('')
    
    useEffect(() => {
        console.log("drrrrrrrrrrrrrrrr", props)
        if (props.user.userName === null) {
            props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
        }
        if(props.comp.compName===null){
            props.getCompAction('61977c1d44ce0ea040b4d25c')
        }
        
        if (change) {
            setAdd('שינוי')
        }

    });

const QList=[
    
]
// props.comp.typeProps.map(q=>{
//     return(
//         <div>
//             {q.question}
//         </div>
//     )}
// )

    function addQ() {
        if (!change) {
            const qe = { question: question, option1: option1, option2: option2, option3: option3, checked: checked };
            setTypeProps([...typeProps, qe]);

        }
        else {
            typeProps.forEach(i => {
                if (i.question === save) {
                    i.question = question;
                    i.option1 = option1;
                    i.option2 = option2;
                    i.option3 = option3;
                    i.checked = checked
                    return
                }
            });
            setChange(false)
            setChecked('')
            setAdd('הוספה')
        };
    }

    const usersList = 
    props.comp.usersList.map(p => {
        return (
            <div >
                <div>{p.userName}</div>
                <div>{p.score}</div>
            </div>
        )
    })
    return (
        <div className="competitions-style">
            <NavBar className="competitions-nav"></NavBar>
            <div className="competitions-details">
                <div className="comp-father-div">
                    <h1 className="comp-header-secondpage">{props.comp.compName}</h1>
                    <h3 className="comp-header-secondpage">ניהול תחרות</h3>
                    <div>{props.comp.details}</div>
                    <img src={"http://localhost:3000/" + props.comp.image}></img>
                    <div> <Link to={`/manager/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
                    <div className="competitions-list">
                        <div className="competitions-list-header">משתתפים</div>
                        {usersList}
                    </div>
                </div>
            </div>
            <div>
                <div>השאלות</div>
                <div>{QList}</div>
            </div>
        </div>)

}

const mapStateToProps = (state) => {
    console.log("ddddddddd", state)
    return {
        user: state.user.userActive,
        comp: state.comp.competitionActive.competition,
        error: state.user.loginError
    }
}

export default connect(mapStateToProps, { getUserAction, getCompAction })(LiveTrivia);
//https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs