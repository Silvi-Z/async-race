import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { CarIcon } from "../../assets/car.js"
import { Race } from '../../styled';
import { Car } from '../../pages/Garage';
import { getCarsForm, startCarRace } from '../../form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { State } from '../..';

interface RaceProps {
    car: Car,
    currentPage: number,
    updateCarId: (arg: number) => void,
    startAllCars: boolean
}

const RaceLine: React.FC<RaceProps> = ({ startAllCars, currentPage, car, updateCarId }) => {
    const [velocity, setVelocity] = useState(0);
    const [drive, setDrive] = useState(true);
    const [status, setStatus] = useState('stopped')
    const best = useSelector((state: State) => state.best)
    const dispatch = useDispatch()
    const deleteCar = async (id: number) => {
        await fetch(`http://localhost:3000/garage/${id}`, {
            method: "DELETE"
        });
        await getCarsForm(currentPage, dispatch)
    }

    const start = async (id: number, action: string, all: string) => {
        const data = await startCarRace(id, action);
        setVelocity(data[0])
        setStatus('started')
        if(action === "started"){
            const driveTest = await startCarRace(id, 'drive');
            all && (driveTest ? dispatch({ type: "BEST", value: data }) : dispatch({ type: "BEST", value: [0, id] }))
            setDrive(driveTest)
        }
    }

    useEffect(() => {
        startAllCars && start(car.id, "started", "all")
    }, [startAllCars])
    return (
        <Race speed={velocity} drive={drive}>
            <div>
                <div>
                    <Button onClick={() => updateCarId(car.id)} context="SELECT" color="#ff7de3" />
                    <Button type={'submit'} onClick={() => deleteCar(car.id)} context="REMOVE" color="#58d2fe" />
                </div>
                <div>
                    <Button disabled={status === "started"} onClick={() => start(car.id, "started", "")} context="A" color="#faff1f" />
                    <Button disabled={status === "stopped"} onClick={() => start(car.id, "stopped", "")} context="B" color="#faff1f" />
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
