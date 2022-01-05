import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import NavBar from "../navBar/navBar";
import ButtonBases from "./type";

export default function Create(){



    return(
       <div>
           <NavBar></NavBar>
           <ButtonBases></ButtonBases>
       </div> 
    )
}