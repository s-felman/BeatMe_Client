import React, { useEffect } from 'react';
import NavBar from "./navBar";
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import "./flexBox.css";
import { getAllCompAction } from "../../actions/compActions";
import { connect } from "react-redux";
import { getUserAction, registerToCompAction } from "../../actions/usersActions"

const Competitions = (props) => {

    useEffect(() => {
        if (props.location.compProps !== undefined) {
            localStorage.setItem("usersList", props.location.compProps.userList)
        }
        if (props.user.userName === null) {
            props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
        }
    }, [props])

    useEffect(() => {
        props.getAllCompAction()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (props.isLogged === true && props.user.userName === null) {
            var u = JSON.parse(localStorage.getItem('user'));
            props.getUserAction(u._id)
        }
    }, [props])

    const compEnter = (p) => {
        var register = false;
        if (props.user.competitionsList != null) {
            props.user.competitionsList.forEach(element => {
                if (element === p._id) {
                    register = true;
                    window.location.replace(`participant${p.compType}/${p._id}`)
                    return
                }

            })
            if (!register)
                props.registerToCompAction(props.user._id, p._id);
        }

    }
    debugger
    var list = props.competitions.length !== 0 ? props.competitions : []
    const mymap = list
        .map(p => {
            return (
                <div p={1}>
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img className="flex-box-img" variant="top" src={"http://localhost:3000/" + p.image} />
                        <Card.Body>
                            <Card.Title className="title">{p.compName}</Card.Title>
                            <Card.Text className="details1">
                                {p.details}
                            </Card.Text>
                            <button variant="primary" className="enter" onClick={() => compEnter(p)}>כניסה</button>
                        </Card.Body>
                    </Card>
                </div>
            );

        })

    return (
        <div>
            <div >
                <NavBar />
            </div>
            <div className="titles" id="compList">התחרויות</div>
            <Box
                //   justifyContent="center"
                display="flex"
                flexWrap="wrap"
                p={1}
                m={1}>
                {mymap}
            </Box>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        competitions: state.comp.competitions,
        user: state.user.userActive,
    }
}
export default connect(mapStateToProps, { getAllCompAction, getUserAction, registerToCompAction })(Competitions);

//https://material-ui.com/system/flexbox/#flex-shrink
//https://react-bootstrap.github.io/components/cards/


