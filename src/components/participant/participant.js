import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';
import { getCompByUserAction } from "../../actions/compActions"
import { getUserAction } from "../../actions/usersActions"
import "../manager/allCompetitions.css"
import NavBar from "../general/navBar";

const Participant = (props) => {
    const [compList, setCompList] = useState(props.user.competitionsList);
    const [nocompList, setNoCompList] = useState("");

    useEffect(() => {
        if (props.isLogged === true && props.user.userName === null) {
            var u = JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            setCompList(u.competitionsList);
        }
        debugger
        if(compList===null){
            setNoCompList("כרגע אין תחרויות שאתה משתתף בהן:(")
        }
        else{
            setNoCompList("")
        }
        
        // props.getCompByUserAction(compList)
   // eslint-disable-next-line      
    },[])

    
    
    useEffect(() => {
        if (props.isLogged === true && props.user.userName === null) {
            var u = JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
            props.getCompByUserAction(u.competitionsList);
        }
        else if (props.competitions===undefined || props.competitions===null)
        props.getCompByUserAction(compList)
        setNoCompList("")
         // eslint-disable-next-line  
    },[compList, props]);

    

    var list= props.competitions!==undefined? props.competitions: []; 
    const competitionslist = list.map(p => {
        var image= `http://localhost:3000/${p.image}`;

    const style={
        backgroundImage: `url(${image})`,
        width: "441px",
        height: "321px",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: "-37px"
       }
        return (
            <Link style={{textDecoration: 'none'}}to={{ pathname: `/participant${p.compType}/${p._id}`}} className='linkComp' >
            <Card  className="allCompetition-card" >
                <div style={style}>
            {/* <Card.Img variant="top" className="allCompetition-card-img" src={"http://localhost:3000/" + p.image } /> */}
              </div>
              <Card.Title className="allCompetition-card-header">{p.compName}</Card.Title>
              <Card.Text className="allCompetition-card-details">
                {p.details}
              </Card.Text>
          </Card>
          </Link>
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
                <Link to={{ pathname:`/competitions`, state: { to: 'create' } }} >
                        <button className="allCompetitions-card-button"> השתתפות בתחרות נוספת
                        </button>
                    </Link>
            </div>

            <div className="create-profile">
                <img src={"http://localhost:3000/"+props.user.image} className="profile-pic" alt="img"></img>
                <label className="profile-name">{props.user.userName}</label>
                <label className="profile-name-props">משתתף בתחרות</label>
                <Link to="/updateUser">
                    <button className="edit-profile-text">ערוך פרופיל</button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        competitions: state.comp.competitions.comps,
        isLogged: state.user.isLogged
    }
}

export default connect(mapStateToProps, { getUserAction, getCompByUserAction })(Participant);

//https://react-select.com/home