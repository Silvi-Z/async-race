import React, { useEffect, useState } from 'react';
import ControlLine from '../ControlLine';
import Arrows from "../../assets/arrows.png"
import RaceLine from '../RaceLine';
import { NeonText, Races } from '../../styled';
import { Flex, Pagination } from 'antd';
export interface Car {
  name: string;
  color: string
}

function Garage() {
  const [cars, setCars] = useState<Car[]>([]);
  const getCars = async () => {
    const response = await fetch("http://localhost:3000/garage");
    setCars(await response.json());
  }
  useEffect(() => {
    getCars()
  }, [])


  return (
    <>
      <ControlLine />
      <img src={Arrows} alt="" />
      <Races>
        {cars.map((car) => (
          <RaceLine {...{ car }} />
        ))}
      </Races>
      <Flex justify={"space-between"} align={'center'}>
        <NeonText>GARAGE ({cars?.length})</NeonText>
        <Pagination defaultCurrent={1} defaultPageSize={7} total={cars?.length} />
      </Flex>
    </>
  );
}

export default Garage;
