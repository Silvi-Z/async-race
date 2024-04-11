import React, { useEffect, useState } from 'react';
import ControlLine from '../../components/ControlLine';
import Arrows from "../../assets/arrows.png"
import RaceLine from '../../components/RaceLine';
import { NeonText, Races } from '../../styled';
import { Flex, Modal } from 'antd';
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
  const best = useSelector((state: State) => state.best)
  const total = useSelector((state: State) => state.total)
  const [selectedCarId, setSelectedCarId] = useState<any>()
  const dispatch = useDispatch();
  const carsSelector = useSelector((state: State) => state.cars)
  const [startAllCars, setStartAllCars] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bestScore, setBestScore] = useState<[number, string] | null>(null);


  const getCars = async () => {
    await getCarsForm(currentPage, dispatch);
  }
  useEffect(() => {
    const isAllCars = (best.length === cars.length) && (best.length > 0)
    if (isAllCars) {
      const bestResult = best.reduce((smallest, current) => {
        if (current[0] > 0 && current[0] < smallest[0]) {
            return current;
        } else {
            return smallest;
        }
    }, best.find(item => item[0] > 0));      
    const winnerCar = cars.find(car => car.id === bestResult[1]);
      if(winnerCar) {
        setBestScore([bestResult[0], winnerCar.name])
        setIsModalOpen(true)
      }
    }
  }, [best])
  useEffect(() => {
    getCars()
  }, [currentPage])

  useEffect(() => {
    setCars(store.getState().cars)
  }, [carsSelector])

  const changePage = (type: string) => {
    const isCar = +total / 7 > currentPage
    if (type === "next" && isCar) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage > 1 && type === "prev") {
      setCurrentPage(currentPage - 1)
    }

  };
  const updateCarId = (name: number): void => {
    setSelectedCarId(name)
  }

  const start = async () => {
    setStartAllCars(!startAllCars)
    // const data = await startCarRace(id)
  }

  return (
    <>
      <Modal footer={null} open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <h2>WINNER</h2>
        {bestScore && (
          <>
            <p>Time: {bestScore[0]}</p>
            <p>Winner: {bestScore[1]}</p>
          </>
        )}
      </Modal>

      <ControlLine start={start} currentPage={currentPage} id={selectedCarId} />
      <img src={Arrows} alt="" />
      <Races>
        {cars.map((car) => (
          <RaceLine startAllCars={startAllCars} updateCarId={updateCarId} currentPage={currentPage} {...{ car }} />
        ))}
      </Races>
      <Flex justify={"space-between"} align={'center'}>
        <NeonText color={"#ff7de3"}>GARAGE ({total})</NeonText>
        <div>
          <Button onClick={() => changePage('prev')} color={"blue"} context="prev" />
          <NeonText color={"blue"}>PAGE {currentPage}</NeonText>
          <Button onClick={() => changePage('next')} color={"blue"} context="next" />
        </div>
      </Flex>
    </>
  );
}

export default Garage;
