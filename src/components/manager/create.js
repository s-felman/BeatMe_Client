import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "./create.css";
import NavBar from "../general/navBar";
import {getCompByManagerAction} from "../../actions/compActions"
import {getUserAction} from "../../actions/usersActions"
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';


init("user_qMw5HuferY6tdn7CfelD1");

const Create = (props) => {

  const images = [
    {
      title: 'חידון',
      path: "/trivia"

    },
    // {
    //   title: 'פרויקט משותף',
    //   path: "/team"
    // },
    {

      title: 'תחרות הצבעות',
      path: "/votes"
    },
    {
      title: 'משימות מחולקות',
      path: "/multitasks"

    },
    {
      title: 'משימה בודדת',
      path: "/onetask"

    },
  ];
    const [value, setValue] = useState('/create');
    const [cname, setCname] = useState('');
    const [userList, setUserList] = useState([]);
    const [buttonSelected, setButtonSelected] = useState("");
    const [cnameError, setCNameError] = useState('');
    const [pathError, setPathError] = useState('');
    const [manager, setManager] = useState('');
    const [managerId, setManagerId]=useState('')
    const [placeholder_name]=useState('שם לתחרות')
  useEffect(() => {
      
      if(props.match.params.id!=null&& props.user.userName===null){
        props.getUserAction(props.match.params.id)
      }
      setManager(props.user.userName);
      setManagerId(props.user._id)

    },[props]);

  useEffect(()=>{
      setButtonSelected(localStorage.getItem('type'))
      setValue(localStorage.getItem('type')) 
      setCname(localStorage.getItem('compName'))
  },[])

    useEffect(() => { 
      cnameErrorFucntion(cname);
    },[cname]);

    function checkValidations(cname, value) {
      localStorage.setItem("usersList", JSON.stringify(userList))
      if(value!=='/create'&& cname!=='')
        {
          localStorage.setItem("type", value)
          window.location.replace(`${value}/${cname}`)
        }
        if(value==='/create')
        pathErrorFucntion(value)
        if (cname === '') 
        cnameErrorFucntion(cname);
    
    }

    function cnameErrorFucntion(text) {
      if (text !== '') {
        setCNameError("");
        return false;
      }
      else {
        setCNameError("שדה חובה");
        return true;
      }
    }
    function pathErrorFucntion(text) {
      if (text !== '/create') {
        setPathError("");
        return false;
      }
      else {
        setPathError("חובה לבחור סוג תחרות");
        return true;
      }
    }
    function func(managerId){
      props.getCompByManagerAction(managerId)
    }


    const list = userList
      .map(p => {
        return (
          <div className="profile-participant-card">
            <label className="profile-participant-name">{p.userName}</label>
            {/* <img className="profile-participant-pic" src={p.pic}></img> */}
          </div>
        )
      })


    const AddUser = (props) => {
      const [showResults, setShowResults] = useState(false);


      const onClick = () => {
        if(!showResults)
        setShowResults(true);
        else
        setShowResults(false)
      }

      const Results =() => {
        const [username, setUsername] = useState("");
        const [useremail, setUseremail] = useState("");
        useEffect(()=>{
          
        })

        const user = (userName, userEmail) => {
          const u = { userName: userName, userEmail: userEmail };
          setUserList([...userList, u]);

        }

        const sendEmail = () => {
          emailjs.send('service_hhnf93h', 'template_z0dxy0e',
            {
              from_name: manager,
              customer_address: useremail,
              to_name: username,
            }, 'user_qMw5HuferY6tdn7CfelD1')
            .then((result) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });
          ;

        }
        return (
          <div id="results" className="search-results">
            <input className="search-input" placeholder="שם משתתף" type="text" value={username} onChange={event => setUsername(event.target.value)} ></input><br />
            <input  className="search-input" placeholder="כתובת מייל" type="email" value={useremail} onChange={event => setUseremail(event.target.value)}></input><br />
            <button id="addUser" className="search-button" onClick={() => {
              user(username, useremail); alert("המשתתף נוסף בהצלחה וקיבל זימון למייל");
              setUsername(" "); setUseremail(" "); setShowResults(false); func(managerId);
              sendEmail();
              
            }} >הוספה</button>
          </div>
        )
      }
      return (
        <div >
          <input className="add-perticipant-button" type="submit" value="הוספת משתתף" onClick={onClick} />
          {showResults ? <Results cname={props.cname} /> : null}
        </div>
      )
    }


  return (
    <div className="create-style">
      <div className="create-nav">
        <NavBar ></NavBar>
      </div> 
      <div className="create-props">
        <input type="text" placeholder={placeholder_name}
          id="name" value={cname}
          onChange={event=> {setCname(event.target.value); localStorage.setItem("compName",event.target.value)}} className="competiton-name-input" ></input><br />
        <span className='error'>{cnameError}</span>
        <div className="card-center">
        <div className="card-type-competition" >
          {images.map((image) => {
            return <button className={image.path === buttonSelected ? "create-button-selected" : "select-competiton-type"} 
            onClick={() => { setValue(image.path); setButtonSelected(image.path) }}>
              <h2 className="title-type">{image.title}</h2>
            </button>
          })}
        </div></div>
        <span className='error'>{pathError}</span><br />
        <div className="create-buttons-div">
         <AddUser></AddUser>
        </div>

          <button className="continue-button" type="submit" onClick={() => { checkValidations(cname, value) }}>
            המשך</button>

      </div>
      <div className="create-profile">
        <img src={"http://localhost:3000/"+props.user.image} alt="img" className="profile-pic"></img>
        <label className="profile-name">{props.user.userName}</label>
        <label className="profile-name-props">מנהל התחרות</label>
        <Link to="/updateUser">
          <button className="edit-profile-text">ערוך פרופיל</button>
        </Link>
        <label className="profile-participants-label">משתתפי התחרות</label>
        <div className="profile-list">{list}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("create state", state)
  return {
    user: state.user.userActive,
    competitions: state.comp.competitionActive
  }
}

export default connect(mapStateToProps,{getUserAction, getCompByManagerAction})(Create);

//https://dashboard.emailjs.com/admin/templates/hbl27zc
//https://reactjs.org/docs/forms.html
//https://dev.to/muhammadawaisshaikh/how-to-get-an-updated-state-of-child-component-in-the-parent-component-using-the-callback-method-1i5