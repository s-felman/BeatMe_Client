import axios from 'axios';
const url1 = "http://localhost:3000/competition/createitem";
const url2 = "http://localhost:3000/competition/getitem";
export const getItems = ()=>axios.get(url2);
export const createItem = (item)=>axios.post(url1,item);