import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getUserAction } from "../../../actions/usersActions"
import { getCompAction, addWinner } from "../../../actions/compActions";
import { getPartByCompAction } from '../../../actions/participantAction'
import "./live.css"
import { Table } from 'react-bootstrap';
import NavBar from "../../general/navBar";
// import { Radio } from "@material-ui/core";

const LiveTrivia = (props) => {

    //     const [typeProps, setTypeProps] = useState([]);
    //     const [option1, setOption1] = useState('')
    //     const [option2, setOption2] = useState('')
    //     const [option3, setOption3] = useState('')
    //     const [change, setChange] = useState(false)
    const [winnerMsg, setWinnerMsg] = useState('בחר כמנצח')
    //     const [save, setSave] = useState('')
    //     const [checked, setChecked] = useState('')

    useEffect(() => {
        if (props.user.userName === null) {
            props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
        }
        if (props.comp.compName === null) {
            props.getCompAction(window.location.pathname.split('/').pop())
        }

        if (props.compPatricipant === undefined) {
            props.getPartByCompAction(window.location.pathname.split('/').pop())
        }
    }, [props]);

    // useEffect(()=>{
    //     
    // },[addWinner()])
    const addWinner = (winnerId, winnerName) => {
        props.addWinner(window.location.pathname.split('/').pop(), winnerId)
        alert(`בחרת בהצלחה כמנצח את ${winnerName}`)
        props.getPartByCompAction(window.location.pathname.split('/').pop())
    }

    // const usersList = 
    // props.compPatricipant?.map(p => {
    //     return (
    //             <div className='profile-participant-card'>{p.userId.userName}</div>
    //     )
    // })
    let list = props.compPatricipant ? props.compPatricipant.map((part, index) => {
        return <tr className={props.comp.winner === part.userId._id ? 'winnerLine' : ''}>
            <th scope="row" >{index + 1}</th>
            <td >{part.userId.userName}</td>
            <td >{part.userId.email}</td>
            {/* <td className='winner'>צפה בפרטים</td> */}
            <td >{part.score}</td>
            <td className='winner' onClick={() => addWinner(part.userId?._id, part.userId.userName)}>
                {props.comp.winner === part.userId._id ? 'המנצח' : 'בחר כמנצח'}
                {/* {part.userId._id=== props.comp.winner?setWinnerMsg('המנצח') :winnerMsg} */}
            </td>
        </tr>
    }) : []

    return (
        <div className="allCompetitions-style">
            <NavBar className="competitions-nav"></NavBar>
            <div className="live-competitions-details">
                <h1 className="comp-header-secondpage">{props.comp?.compName}</h1>
                <Table className="table table-hover table-active large" style={{ fontSize: '28px', textAlign: 'right' }}>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">שם משתמש</th>
                            <th scope="col">מייל</th>
                            {/* <th scope="col">תשובות</th> */}
                            <th scope="col">ניקוד</th>
                            <th scope="col">בחירה כמנצח</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>

            </div>
            {/* <div className="comp-father-div"> */}
            {/* <h1 className="comp-header-secondpage">{props.comp?.compName}</h1>
                    <h3 className="comp-header-secondpage">ניהול תחרות</h3>
                    <div>{props.comp?.details}</div>
                    <img src={"http://localhost:3000/" + props.comp?.image}></img>
                    <div> <Link to={`/manager/${props.user?._id}`}>  <button className="props-button">חזור</button></Link></div>
                    <div className="competitions-list">
                        <div className="competitions-list-header">משתתפים</div>
                         {/* {usersList}                 
                    </div> */}
            <div className="create-profile">
                <img src={"http://localhost:3000/" + props.user.image} alt="img" className="profile-pic"></img>
                <label className="profile-name">{props.user.userName}</label>
                <label className="profile-name-props">מנהל התחרות</label>
                <Link to="/updateUser">
                    <button className="edit-profile-text">ערוך פרופיל</button>
                </Link>
                {/* <label className="profile-participants-label">משתתפי התחרות</label> */}
                {/* <div className='profile-participant-card'>
            {usersList}
        </div> */}
            </div>
            {/* </div> */}
        </div>)

}

const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        comp: state.comp.competitionActive,
        error: state.user.loginError,
        compPatricipant: state.part.compProps.competitions,
    }
}

export default connect(mapStateToProps, { getUserAction, addWinner, getCompAction, getPartByCompAction })(LiveTrivia);
// //https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs