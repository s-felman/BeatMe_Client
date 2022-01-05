import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../navBar/navBar";

const UserLogin=()=>{

    return(
        <div>
            <NavBar></NavBar>
            <from><br/>
                <label>שם משתמש</label>
                <input type="text" ></input><br/><br/>
                <label>סיסמא</label>
                <input type="password" ></input><br/><br/>
                <Link to="/participant">
                    <button>Enter</button>
                </Link>
            </from>
        </div>
    ) 
}
export default UserLogin;