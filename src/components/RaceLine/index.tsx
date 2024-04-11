import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { CarIcon } from "../../assets/car.js"
import { Race } from '../../styled';
import { Car } from '../../pages/Garage';
import { getCarsForm, startCarRace } from '../../form';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { State, store } from '../..';

interface RaceProps {
    car: Car,
    currentPage: number,
    updateCarId: (arg: number) => void,
    startAllCars: boolean
}

const RaceLine: React.FC<RaceProps> = ({ startAllCars, currentPage, car, updateCarId }) => {
    const [velocity, setVelocity] = useState(0);
    const [drive, setDrive] = useState(true)
    const best = useSelector((state: State) => state.best)
    const dispatch = useDispatch()
    const deleteCar = async (id: number) => {
        await fetch(`http://localhost:3000/garage/${id}`, {
            method: "DELETE"
        });
        await getCarsForm(currentPage, dispatch)
    }

    const start = async (id: number) => {
        const data = await startCarRace(id, 'started');
        setVelocity(data[0])
        const test = await startCarRace(id, 'drive');
        test ? dispatch({ type: "BEST", value: data }) : dispatch({ type: "BEST", value: [0, id] })
        setDrive(test)
        
    }

    useEffect(() => {
        startAllCars && start(car.id)
    }, [startAllCars])
    return (
        <Race speed={velocity} drive={drive}>
            <div>
                <div>
                    <Button onClick={() => updateCarId(car.id)} context="SELECT" color="#ff7de3" />
                    <Button type={'submit'} onClick={() => deleteCar(car.id)} context="REMOVE" color="#58d2fe" />
                </div>
                <div>
                    <Button onClick={() => start(car.id)} context="A" color="#faff1f" />
                    <Button context="B" color="#faff1f" />
                </div>
                <div className='test'>
                    <CarIcon fill={car.color} />
                </div>
            </div>
            <h5>{car.name}</h5>
        </Race>
    );
}

export default RaceLine;
