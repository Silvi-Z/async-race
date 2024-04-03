import React from 'react';
import Button from '../Button';
import {CarIcon} from "../../assets/car.js"
import { Race } from '../../styled';
import { Car } from '../Garage';

interface RaceProps {
    car: Car,
}
const RaceLine:React.FC<RaceProps> = ({car}) => {
    return (
        <Race>
            <div>
                <div>
                    <Button context="SELECT" color="#ff7de3" />
                    <Button context="REMOVE" color="#58d2fe" />
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
