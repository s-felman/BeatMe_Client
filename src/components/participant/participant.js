import React,{useEffect} from "react";
import NavBar from "../general/navBar";
import profile from "../../static/images/participant-profil.png"
import "./participant.css";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { getUserAction } from "../../actions/compActions";

const Participant=(props)=>{
    useEffect(() => {
        //
        //אולי אפשר לא לגשת לשרת אלא להוציא מהסטוראיג
        if (props.isLogged===true && props.user.userName===null) {
            var u=JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            localStorage.setItem("user", JSON.stringify(props.user));
        }
    })

    return(
        <div className="participant-style">
            <div className="participant-nav">
                <NavBar ></NavBar>
            </div>
            <div className="participant-props">
                <div className="participant-title">שלום {props.user.userName}</div>
                    <div className="participant-competitions">התחריות שלי</div>
                    <div className="participant-allCompetitions"></div>
                    <div className="participant-profile">
                    <img alt="profile-img" src={profile} className="participant-profile-pic"></img>
                    <label className="participant-profile-name">{props.user.userName}</label>
                    <label className="participant-profile-name-props">משתתף פעיל</label>
                    <Link to="/updateUser">
                        <button className="participant-edit-profile-text">ערוך פרופיל</button>
                    </Link>
                </div>
            </div>
        </div>    
    )
}
const mapStateToProps=(state)=>{
    console.log("sstste", state)
    return{
        user: state.user.userActive,
        competitions: state.comp.competitions,
        isLogged: state.user.isLogged
    }
}
export default connect(mapStateToProps, {getUserAction})(Participant); 


