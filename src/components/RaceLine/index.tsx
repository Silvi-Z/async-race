import React, { useEffect, useState } from 'react';
import Button from '../Button';
import {CarIcon} from "../../assets/car.js"
import { Race } from '../../styled';
import { Car } from '../Garage';

interface RaceProps {
    car: Car,
    getCars: () => void,
    updateCarId: (arg: number) => void

}

const RaceLine:React.FC<RaceProps> = ({getCars, car, updateCarId}) => {
   
    const deleteCar = async (id: number) => {
        await fetch(`http://localhost:3000/garage/${id}`, {
            method: "DELETE"
        });
        getCars()
    }
    return (
        <Race>
            <div>
                <div>
                    <Button onClick={()=>updateCarId(car.id)} context="SELECT" color="#ff7de3" />
                    <Button type={'submit'} onClick={()=>deleteCar(car.id)} context="REMOVE" color="#58d2fe" />
                </div>
                <div>
                    <Button context="A" color="#faff1f" />
                    <Button context="B" color="#faff1f" />
                </div>
                <div className='test'>
                    <CarIcon fill={car.color}/>
                </div>
            </div>
            <h5>{car.name}</h5>
        </Race>
    );
}

export default RaceLine;
