import React from "react"
import NewUser from "../userLogin/userLogin"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import "./navBar.css"

function NavBar(){


 return(
<nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
  <div className="container-fluid">
  <form className="d-flex">
        <button className="btn btn-outline-success" type="submit">חיפוש</button>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      </form>
      <Link to="/signup">  
      <button type="button" className="btn btn-light btn-lg">הרשמה</button>
          </Link>
       
      <button type="button" className="btn btn-light btn-lg">משתתף תחרות</button>
      <Link to="/manager">  
      <button type="button" className="btn btn-secondary btn-lg">מנהל תחרות</button>
          </Link>
 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="">עלינו</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="">תחרויות</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="true">
            סוגי תחרויות
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">משימות</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
 
      </ul>
     
      <Link to="/">
    <a className="navbar-brand p-2 bd-highlight" >BeatMe</a>
   </Link>
    </div>
  </div>
</nav>
 );   
}
export default NavBar