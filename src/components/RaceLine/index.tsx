import React, { useState } from 'react';
import Button from '../Button';
import {CarIcon} from "../../assets/car.js"
import { Race } from '../../styled';
import { Car } from '../../pages/Garage';
import { getCarsForm, performApiRequest } from '../../form';
import { useDispatch } from 'react-redux';

interface RaceProps {
    car: Car,
    currentPage: number,
    updateCarId: (arg: number) => void
}

const RaceLine:React.FC<RaceProps> = ({currentPage, car, updateCarId}) => {
    const [velocity, setVelocity] = useState(0)
    const dispatch = useDispatch()
    const deleteCar = async (id: number) => {
        await fetch(`http://localhost:3000/garage/${id}`, {
            method: "DELETE"
        });
        await getCarsForm(currentPage, dispatch)
    }
    const start = async(id:number) => {
        const res = await performApiRequest(`http://localhost:3000/engine?id=${id}&status=started`, "PATCH",{} )
        const speed = res.velocity/10
        setVelocity(speed)
    }
    return (
        <Race speed={velocity}>
            <div>
                <div>
                    <Button onClick={()=>updateCarId(car.id)} context="SELECT" color="#ff7de3" />
                    <Button type={'submit'} onClick={()=>deleteCar(car.id)} context="REMOVE" color="#58d2fe" />
                </div>
                <div>
                    <Button onClick={()=>start(car.id)} context="A" color="#faff1f" />
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
