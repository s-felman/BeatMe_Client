import React, {useState, useEffect}from 'react';
import './App.css';
import SongDetails from './component/SongDetails';
import SongList from './component/SongList';

const App = () => {
  const [selecedSong, setSelectedSong] = useState({name:'', author:'',length:''});
  const [title, setTitle] = useState('');
  const [Dn, setDn] = useState(false);
  const songList = [{name:'Song1', author:'Name1',length:'1:08'},
                    {name:'Song2', author:'Name2',length:'4:04'},
                    {name:'Song3', author:'Name3',length:'2:24'},
                    {name:'Song4', author:'Name4',length:'4:00'},
                    {name:'Song5', author:'Name5',length:'1:87'}];

  useEffect(()=>{
    Dn? setTitle('The Selected Song: '+selecedSong.name +'  Song duration:' + selecedSong.length): setTitle('The Selected Song: '+selecedSong.name)
  },[selecedSong, Dn]);
  return (
    <div>
      <div>{title}</div>
      <div>
      <button 
        onClick ={() => {setDn(!Dn)}}>song duration in title</button>
      </div>
      <SongList res={songList} res2={setSelectedSong}/>
      <SongDetails res ={selecedSong}/>
    </div>
  );
}
export default App;
