import React, { useEffect, useState } from 'react';
import ControlLine from '../../components/ControlLine';
import Arrows from "../../assets/arrows.png"
import RaceLine from '../../components/RaceLine';
import { NeonText, Races } from '../../styled';
import { Flex } from 'antd';
import Button from '../../components/Button';
import { getCarsForm } from '../../form';
import { State, store } from '../..';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
export interface Car {
  name: string;
  color: string;
  id: number
}

function Garage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const total = useSelector((state:State) => state.total)
  const [selectedCarId, setSelectedCarId] = useState<any>()
  const dispatch = useDispatch();
  const carsSelector = useSelector((state:State) => state.cars)

  const getCars = async() => {
    await getCarsForm(currentPage, dispatch);
  }
  useEffect(() => {
    getCars()
  }, [currentPage])

  useEffect(()=> {
    setCars(store.getState().cars)
  },[carsSelector])

  const changePage = (type: string) => {
    const isCar = +total/7 > currentPage
    if(type === "next" && isCar) {
      setCurrentPage(currentPage+1);
    }else if (currentPage > 1 && type === "prev") {
      setCurrentPage(currentPage-1)
    }
    
  };
  const updateCarId = (name: number):void => {
    setSelectedCarId(name)
}

  return (
    <>
      <ControlLine currentPage={currentPage} id={selectedCarId} />
      <img src={Arrows} alt="" />
      <Races>
        {cars.map((car) => (
          <RaceLine updateCarId={updateCarId} currentPage={currentPage} {...{ car }} />
        ))}
      </Races>
      <Flex justify={"space-between"} align={'center'}>
        <NeonText color={"#ff7de3"}>GARAGE ({total})</NeonText>
        <div>
        <Button onClick={()=>changePage('prev')} color={"blue"} context="prev"/>
        <NeonText color={"blue"}>PAGE {currentPage}</NeonText>
        <Button onClick={()=>changePage('next')} color={"blue"} context="next"/>
        </div>
      </Flex>
    </>
  );
}

export default Garage;
