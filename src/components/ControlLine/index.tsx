import React, { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import {
    ColorPicker,
    Form,
    Input,
    type FormProps,
    ColorPickerProps,
    GetProp
} from 'antd';
import { ControlLineWrapper } from '../../styled';
import { getCarsForm, performApiRequest } from '../../form';
import { useDispatch } from 'react-redux';
import randomBrands from "../../cars.json"
import { Car } from '../../pages/Garage';

type CarData = {
    [brand: string]: string[];
};

type FieldType = {
    name?: string;
    color?: string;
    defaultValue?: string
};
interface ControlLineProps {
    currentPage: number;
    id: number;
    start: () => void;
    stop: () => void;
    cars: Array<any>
}

type Color = GetProp<ColorPickerProps, 'value'>;

const ControlLine: React.FC<ControlLineProps> = ({cars, start, stop, currentPage, id }) => {
    const dispatch = useDispatch()
    const [color, setColor] = useState<Color>('1677ff');
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [selectedCar, setSelectedCar] = useState<Car | undefined>();

    const changedColor = useMemo<string>(() =>
        (typeof color === 'string' ? color : color!.toHexString()),
        [color],
    );
    const createCar: FormProps<FieldType>["onFinish"] = async (values) => {
        await performApiRequest(`http://localhost:3000/garage`, "POST", {
            name: values.name,
            color: changedColor
        })
        createForm.resetFields();
        await getCarsForm(dispatch, true, currentPage)
    };

    const updateCar: FormProps<FieldType>["onFinish"] = async (values) => {
        await performApiRequest(`http://localhost:3000/garage/${id}`, "PUT", {
            name: values.name,
            color: changedColor
        })
        updateForm.resetFields();
        await getCarsForm(dispatch, true, currentPage)
    };

    useEffect(()=> {
        const selected = cars?.find((car: Car) => car.id === id);
        if(selected){
            setSelectedCar(selected);
        setColor(selected?.color)
        updateForm.setFieldsValue(selected)
        }

    },[id, cars]);
 


    const generateRandomCars = async () => {
        const brands: CarData = randomBrands;
        const getRandomInt = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const generateRandomCar = async () => {
            const brandNames = Object.keys(brands);
            const randomBrand = brandNames[getRandomInt(0, brandNames.length - 1)];
            const models = brands[randomBrand];
            const randomModel = models[getRandomInt(0, models.length - 1)];
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            await performApiRequest(`http://localhost:3000/garage`, "POST", {
                name: `${randomBrand} ${randomModel}`,
                color: `#${randomColor}`
            })
        };

        const randomCars = [];
        for (let i = 0; i < 100; i++) {
            randomCars.push(generateRandomCar());
        }
        await getCarsForm(dispatch, true, currentPage)

    };


    return (
        <ControlLineWrapper>
            <div>
                <Button onClick={() => start()} size="small" context='RACE' color='#58fe9c' />
                <Button onClick={() => stop()} size="small" context='RESET' color='#ff7de3' />
            </div>
            <div>
                <Button onClick={() => generateRandomCars()} size="small" context='GENERATE CARS' color='#ff7de3' />
            </div>
            <Form
                form={createForm}
                layout="inline"
                onFinish={createCar}
            >
                <Form.Item<FieldType>
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="color"
                >
                    <ColorPicker onChange={setColor} value={color} defaultValue="#1677ff" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="submit" size="small" context='CREATE' color='#ff7de3' />
                </Form.Item>
            </Form>
            <Form
                form={updateForm}
                layout="inline"
                onFinish={updateCar}
                initialValues={selectedCar}
            >
                <Form.Item<FieldType>
                    name="name"
                >
                    <Input disabled={!id} type="text" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="color"
                >
                    <ColorPicker value={color} onChange={setColor} disabled={!id} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="submit" disabled={!id} size="small" context='UPDATE' color='#ff7de3' />
                </Form.Item>
            </Form>
            <div>
            </div>
            
        </ControlLineWrapper>
    );
}

export default ControlLine;
