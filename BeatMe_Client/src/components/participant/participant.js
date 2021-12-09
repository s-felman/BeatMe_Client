import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';
import { getCompByParticipantAction } from "../../actions/compActions"
import { getUserAction } from "../../actions/usersActions"
import profile from "../../static/images/profile-pic.png"
import "../manager/allCompetitions.css"
import NavBar from "../general/navBar";

const AllComp = (props) => {
   
    useEffect(() => {
        if (props.isLogged === true && props.user.userName === null) {
            var u = JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            setParticipantId(u._id);
            props.getCompByParticipantAction(participantId)
        }
        if(compList.length===0){
            setNoCompList("כרגע אין תחרויות שאתה משתתף:(")
        }
        else{
            setNoCompList("")
        }

    })
    const [participantId, setParticipantId] = useState(props.user._id);
    const [compList, setCompList] = useState([])
    const [nocompList, setNoCompList] = useState("")
    
    useEffect(() => {
        if (props.competitions !== null && props.competitions !== undefined) {
            setCompList(props.competitions)
        }
        else {
            props.getCompByParticipantAction(participantId)
        }
    });

    const competitionslist = compList.map(p => {
        return (
            
            <Card  className="allCompetition-card" >
                <div className="card-out-div">
            <Card.Img variant="top" className="allCompetition-card-img" src={"http://localhost:3000/" + p.image } />
              </div>
              <Card.Title className="allCompetition-card-header">{p.compName}</Card.Title>
              <Card.Text className="allCompetition-card-details">
                {p.details}
              </Card.Text>
          </Card>
        )
    })
    return (
        <div className="allCompetitions-style">
            <NavBar className="allCompetitions-nav"/>
            
            <div className="allCompetitions-details">
                <div className="allCompetitions-header">שלום {props.user.userName}</div>
                <div className="allCompetitions-header2 ">התחרויות שלי</div>
                <div className="allCompetition-cards">{competitionslist}</div> 
                <span className="no-competitions">{nocompList}</span>
            </div>

            <div className="create-profile">
                <img src={"http://localhost:3000/"+props.user.image} className="profile-pic"></img>
                <label className="profile-name">{props.user.userName}</label>
                <label className="profile-name-props">מנהל התחרות</label>
                <Link to="/updateUser">
                    <button className="edit-profile-text">ערוך פרופיל</button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("xxx", state)
    return {
        user: state.user.userActive,
        competitions: state.comp.competitionActive.competition,
        isLogged: state.user.isLogged
    }
}

export default connect(mapStateToProps, { getUserAction, getCompByParticipantAction })(AllComp);

//https://react-select.com/home