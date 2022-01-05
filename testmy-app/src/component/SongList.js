import React from 'react';
import SongDetails from './SongDetails';
import './Song.css';

const SongList = (props) => {
    const getList = () =>{
        return props.res.map(s =>{
            return <div>
                <div>Song Name:{s.name} 
                    <button onClick={() => props.res2(s)}>select</button>
                </div>
            </div>
        })
    }

    return(
        <div className="SongL"><h1>Song List</h1><br />{getList()}</div>
    );
}

export default SongList;