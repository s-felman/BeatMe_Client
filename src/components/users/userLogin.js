import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { loginAction } from "../../actions/usersActions"
import "./userLogin.css"
import logo from "../../static/images/logo.png"


const UserLogin = (props) => {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [user, setUser] = useState({});
    const [path, setPath] = useState("/userlogin");


    useEffect(() => {
        if (props.error) {
            alert("שם משתמש או סיסמא שגויים")
        } else {
            setUser(props.user._id);

        }
    }, [props.user, props.error])

    

    const req = () => {
        props.loginAction(username, password);        
        localStorage.setItem("user", JSON.stringify(props.user));
        console.log(props.location.state==="create")
        if (props.location.state === "create")
            setPath(`/create`)
        else if  (props.location.state === "participant")
            setPath(`/participant`)
        else{
            setPath(`/participant`)
            // setPath('')
            // setUser('')
        }
    }


    return (
        <div className="ul">
            <div className="logo-pic"><Link to="/"><img alt="logo" src={logo}></img></Link> </div>
            <from className="form-login">

                <h1 className="titles-login">התחברות</h1>
                <a href="/signup" className="go-to-new">משתמש חדש? צור חשבון</a>

                <input type="text" placeholder="שם משתמש\אימייל" className="insert-props" onChange={(e) => setUsername(e.target.value)} ></input>
                <input type="password" placeholder="סיסמא" className="insert-props" onChange={(e) => setPassword(e.target.value)}></input>

                <Link to={{ pathname: `${path}/${user}` ,state: { id:user}}}>
                    <button type="submit" className="button-login" onClick={req}>כניסה</button>
                </Link>

            </from>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        competitions: state.comp.competitions,
    }
}

export default connect(mapStateToProps, { loginAction })(UserLogin);

