import React, {useState ,useEffect } from 'react';
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import '../general/flexBox.css';
import {getUserAction} from "../../actions/usersActions";
import {getAllCompetitionsById} from "../../actions/compActions";
import { connect } from "react-redux";
const participantComp=(props)=> {
    useEffect(() => {
        setManager(props.user.email);
    });
    useEffect(()=>{
     props.getAllCompetitionsById()
    },[Box]);
//note that 
  const mymap = props.competitions
    .map(p =>{
      return (
        <div p={1}>
          <Card style={{ width: '18rem' }} className="box">
            <Card.Img variant="top" src={"http://localhost:3000/" + p.image } />
            <Card.Body>
              <Card.Title className="title">{p.compName}</Card.Title>
              <Card.Text className="details1">
                {p.details}
              </Card.Text>
              <button variant="primary" className="enter">כניסה</button>
            </Card.Body>
          </Card>
        </div>
      );

    })

  return (
    <div>
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
    user: state.user.userActive.user,
    competitions: state.comp.competitions
  }
}
export default connect(mapStateToProps,{getAllCompetitionsById, getUserAction})(participantComp);

//https://material-ui.com/system/flexbox/#flex-shrink
//https://react-bootstrap.github.io/components/cards/


