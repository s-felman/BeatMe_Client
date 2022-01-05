import React, { useState, useEffect } from 'react'
import ShowList from "./showList";
import Faker from "faker";

const Item = () => {
  const [uarray, SetIarray] = useState([])

  useEffect(() => {
    SetIarray([
      { image: Faker.image.city(), header: "levi", details: "12" },
      { image: Faker.image.food(), header: "levi", details: "12" },
      { image: Faker.image.fashion(), header: "levi", details: "12" }])
  }, []);
  uarray2=[
    { image: Faker.image.city(), header: "levi", details: "12" },
    { image: Faker.image.food(), header: "levi", details: "12" },
    { image: Faker.image.fashion(), header: "levi", details: "12" }]

  return <div >
    <ShowList uarray={useState.uarray} />
  </div>

}
export default Item;