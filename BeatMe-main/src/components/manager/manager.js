import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../navBar/navBar"
import { Link } from 'react-router-dom';

export default function Manager() {



    return (

        <div>
            <NavBar></NavBar>
            <Link to="/edit">
                <button type="button" className="btn btn-secondary btn-lg"> עריכת מאפייני תחרות</button>
            </Link>
            <Link to="/create">
                <button type="button" className="btn btn-secondary btn-lg">יצירת תחרות</button>
            </Link>
        </div>
    )
}