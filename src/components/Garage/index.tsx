import React, { useEffect, useState } from 'react';
import ControlLine from '../ControlLine';
import Arrows from "../../assets/arrows.png"
import RaceLine from '../RaceLine';
import { Races } from '../../styled';
import { Pagination } from 'antd';
export interface Car {
  name: string;
  color: string
}

function Garage() {
  

  const [cars, setCars] = useState<Car[]>([]);
  const getCars = async() => {
    const response = await fetch("http://localhost:3000/garage");
    setCars(await response.json());
  }
  useEffect(()=> {
    getCars()
  },[])

  
  return (
    <>
      <ControlLine />
      <img src={Arrows} alt="" />
      <Races>
      {cars.map((car) => (
          <RaceLine {...{ car }} />
        ))}
        {/* <Pagination defaultCurrent={1} total={2} /> */}
      </Races>
    </>
  );
}

export default Garage;
