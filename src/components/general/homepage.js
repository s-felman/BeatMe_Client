import React, { useEffect, useState } from "react";
import NavBar from "./navBar";
import SlideShow from "./slideShow";
import { Link } from 'react-router-dom';
import "./homePage.css";
import FlexWrap from "./flexBox"
import { connect } from "react-redux";
import {getAllCompAction} from "../../actions/compActions";
import {getUserAction} from "../../actions/usersActions"


const HomePage = (props) => {
    const [create, setCreate] = useState('/userlogin');
    const [path, setPath] = useState('/userLogin');
    const [manager, setManager] = useState('/userLogin');

    useEffect(() => {
  
        if (props.isLogged===true && props.user.userName===null) {
            var u=JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            console.log("props.user", props.user,u._id)
            setCreate(`/create/${u._id}`)//check what happen if it is not manager
            setPath(`/participant/${u._id}`)
            setManager(`/manager/${u._id}`)
        }
        else{
            if(props.isLogged===false && props.user.userName===null){
            setCreate('/userlogin')
            setPath('/userlogin')
            setManager('/userlogin')
        }}
    })

    return (
        <div>
            <div >
                <NavBar ></NavBar>
            </div>
            <div className="home-page">
                <SlideShow ></SlideShow>
                <div className="select">
                <Link to={{ pathname: `${manager}`, state: { to: 'manager' , id:props.user._id} }} >
                        <button className="select-type">מנהל תחרות
                        </button>
                    </Link>
                    <Link to={{ pathname: `${path}`, state:'participant' }} >
                        <button className="animate__pulse" className="select-type">מתחרה פעיל
                        </button>
                    </Link>
                    <Link to={{ pathname: `${create}`, state:'create' }}>
                        <button className="animate__bounceIn select-type">יצירת תחרות
                        </button>
                    </Link>
                </div>
                <div className="titles" id="compList">התחרויות</div>


                <div className="comptitions-to-show">
                    <FlexWrap ></FlexWrap>
                </div>
                <div className="titles">קצת עלינו</div>
                <div className="details">
                    ,היא מערכת ייעודית למתחרים ומפעילי תחרויות בכל תחום BeatMe
                    <br />
                    מרכז מגוון של תחרויות ומשימות מסוגים שונים קצרים או מתמשכים BeatMe האתר
                    האתר מרכז מגוון של תחרויות ומשימות מסוגים שונים, קצרים או מתמשכים.
                    האתר מאפשר מעקב אחר התקדמות המשימה/ התחרות והעמידה ביעדים, עד להגעה אל המטרה.
                    מערכת beatme כוללת: מערכת ניהול למנהלי תחרויות ופרויקטים, ומערכת למשתמשים- משתתפי התחרויות. )ניתן להשתתף בכמה תחרויות בו זמנית!(
                </div>
                <div className="go">!!!היכון, הכן, צא</div>
                <div className="footer">כל הזכויות שמורות
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        competitions: state.comp.competitions,
        isLogged: state.user.isLogged
    }
}
export default connect(mapStateToProps,{getAllCompAction, getUserAction})(HomePage);
