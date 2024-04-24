import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { CarIcon } from "../../assets/car.js"
import { Race } from '../../styled';
import { Car } from '../../pages/Garage';
import { getCarsForm, startCarRace } from '../../form';
import { useDispatch } from 'react-redux';

interface RaceProps {
    car: Car,
    currentPage: number,
    updateCarId: (arg: number) => void,
    startAllCars: boolean,
    stopAllCars: boolean,
    setStatus: (arg: string) => void,
    status: string
}

const RaceLine: React.FC<RaceProps> = ({ setStatus, status, startAllCars, stopAllCars, currentPage, car, updateCarId }) => {
    const [velocity, setVelocity] = useState(0);
    const [drive, setDrive] = useState(true);
    const [carStatus, setCarStatus] = useState('stopped')
    const dispatch = useDispatch()
    const deleteCar = async (id: number) => {
        await fetch(`http://localhost:3000/garage/${id}`, {
            method: "DELETE"
        });
        await fetch(`http://localhost:3000/winners/${id}`, {
            method: "DELETE"
        })
        await getCarsForm(dispatch, true, currentPage)
    }

    const start = async (id: number, action: string, all: string) => {
        const data = await startCarRace(id, action);
        const controller = new AbortController();
        setVelocity(data[0])
        !!all ? setStatus(action) : setCarStatus(action)
        if(action === "started"){
            const driveTest = await startCarRace(id, 'drive');
            all && (driveTest ? dispatch({ type: "BEST", value: data }) : dispatch({ type: "BEST", value: [0, id] }))
            setDrive(driveTest)
        }else {
            setDrive(false)
            controller.abort();
        }
    }

    useEffect(() => {
        if (startAllCars) {
            start(car.id, "started", "all");
        } else if (stopAllCars) {
            start(car.id, "stopped", "all");
        }
    }, [startAllCars, stopAllCars]);

    return (
        <Race speed={velocity} drive={drive}>
            <div>
                <div>
                    <Button onClick={() => updateCarId(car.id)} context="SELECT" color="#ff7de3" />
                    <Button type={'submit'} onClick={() => deleteCar(car.id)} context="REMOVE" color="#58d2fe" />
                </div>
                <div>
                    <Button disabled={carStatus === "started" || status === "started"} onClick={() => start(car.id, "started", "")} context="A" color="#faff1f" />
                    <Button disabled={(carStatus === "stopped" && status === 'started') || (status === "stopped" && carStatus !== "started")} onClick={() => start(car.id, "stopped", "")} context="B" color="#faff1f" />
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
