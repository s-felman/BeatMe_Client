import React from 'react';
import SongList from './SongList';
import './Song.css';

const SongDetails = (props) => {

    const getDetails = () =>{
        return <div className="SongD">
            <h1>Song Details</h1>
            <div>Song Name: {props.res.name}<br/> 
                 Author: {props.res.author}<br />
                 Length: {props.res.length}</div>
        </div>
    }

    return(
        <div>{getDetails()}</div>
    );
}


export default SongDetails;