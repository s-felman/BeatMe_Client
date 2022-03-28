import React, { useEffect, useState } from "react";
import NavBar from "./navBar";
import SlideShow from "./slideShow";
import { Link } from 'react-router-dom';
import "./homePage.css";
import FlexWrap from "./flexBox"
import { connect } from "react-redux";
import { getAllCompAction } from "../../actions/compActions";
import { getUserAction } from "../../actions/usersActions"


const HomePage = (props) => {
    const [create, setCreate] = useState('/userlogin');
    const [path, setPath] = useState('/userLogin');
    const [manager, setManager] = useState('/userLogin');

    useEffect(() => {

        if (props.isLogged === true && props.user.userName === null) {
            var u = JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            setCreate(`/create/${u._id}`)
            setPath(`/participant/${u._id}`)
            setManager(`/manager/${u._id}`)
        }
        else {
            if (props.isLogged === false && props.user.userName === null) {
                setCreate('/userlogin')
                setPath('/userlogin')
                setManager('/userlogin')
            }
        }
    }, [props])

    return (
        <div>
            <div >
                <NavBar />
            </div>
            <div className="home-page">
                <SlideShow ></SlideShow>
                <div className="select">
                    <Link to={{ pathname: `${manager}`, state: { to: 'manager', id: props.user._id } }} >
                        <button className="select-type">מנהל תחרות
                        </button>
                    </Link>
                    <Link to={{ pathname: `${path}`, state: 'participant' }} >
                        <button className="animate__pulse select-type">מתחרה פעיל
                        </button>
                    </Link>
                    <Link to={{ pathname: `${create}`, state: 'create' }}>
                        <button className="animate__bounceIn select-type">יצירת תחרות
                        </button>
                    </Link>
                </div>
                <div className="titles" id="compList">התחרויות</div>
                <div className="comptitions-to-show">
                    <FlexWrap />

                </div>
                <Link to={{ pathname: `/competitions` }}>
                    <button className="allCompetitions-card-button"> לכל התחרויות
                    </button>
                </Link>
                <div className="titles">קצת עלינו</div>
                <div className="details">

                    .היא מערכת ייעודית למתחרים ומפעילי תחרויות בכל תחום BeatMe
                    <br />
                    , האתר מרכז מגוון של תחרויות ומשימות מסוגים שונים
                    ומאפשר מעקב אחר התקדמות המשימה או התחרות ועמידה ביעדים
                    <br />
                    .עד להגעה אל המטרה
                    <br />
                    .המערכת כוללת: מערכת ניהול למנהלי תחרויות ופרויקטים, ומערכת למשתמשים- משתתפי התחרויות
                    <br />
                    ניתן ליצור ולהשתתף בכמה תחרויות בו זמנית
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
export default connect(mapStateToProps, { getAllCompAction, getUserAction })(HomePage);
