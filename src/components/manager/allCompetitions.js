import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';
import { getCompByManagerAction } from "../../actions/compActions"
import { getUserAction } from "../../actions/usersActions"
import "./allCompetitions.css"
import NavBar from "../general/navBar";

const AllComp = (props) => {
    const [managerId, setManagerId] = useState(props.user._id);
    const [compList, setCompList] = useState([])
    const [nocompList, setNoCompList] = useState("");

    useEffect(() => {
        if (props.isLogged === true && props.user.userName === null) {
            var u = JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            setManagerId(u._id);
            props.getCompByManagerAction(managerId)
        }
        if(compList.length===0){
            setNoCompList("כרגע אין תחרויות שאתה מנהל:(")
        }
        else{
            setNoCompList("")
        }
    },[props, compList, managerId])


    
    useEffect(() => {
        if (props.competitions !== null && props.competitions !== undefined) {
            setCompList(props.competitions)
        }
        else {
            props.getCompByManagerAction(managerId)
        }
    },[props, managerId]);

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
                <Link to={{ pathname:`/create/${props.user._id}`, state: { to: 'create' } }}>
                        <button className="allCompetitions-card-button"> יצירת תחרות נוספת
                        </button>
                    </Link>
            </div>

            <div className="create-profile">
                <img src={"http://localhost:3000/"+props.user.image} className="profile-pic" alt="img"></img>
                <label className="profile-name">{props.user.userName}</label>
                <label className="profile-name-props">מנהל התחרות</label>
                <Link to="/updateUser">
                    <button className="edit-profile-text">ערוך פרופיל</button>
                </Link>
                <label className="profile-participants-label">משתתפי התחרות</label>
                <div className="profile-list">{ }</div>
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

export default connect(mapStateToProps, { getUserAction, getCompByManagerAction })(AllComp);

//https://react-select.com/home