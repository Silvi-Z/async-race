import React, { useMemo, useState } from 'react';
import Button from '../Button';
import { ColorPicker, Form, Input, type FormProps, ColorPickerProps, GetProp } from 'antd';
import { ControlLineWrapper } from '../../styled';


type FieldType = {
    name?: string;
    color?: string;
};
interface ControlLineProps {
    getCars: () => void
}
type Color = GetProp<ColorPickerProps, 'value'>;

const ControlLine: React.FC<ControlLineProps> = ({ getCars }) => {
    const [color, setColor] = useState<Color>('');

    const changedColor = useMemo<string>(() =>
        (typeof color === 'string' ? color : color!.toHexString()),
        [color],
    );

    const createCar: FormProps<FieldType>["onFinish"] = async (values) => {
        await fetch("http://localhost:3000/garage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                color: changedColor
            }),
        });
        getCars();
    }


    return (
        <ControlLineWrapper>
            <div>
                <Button size="small" context='RACE' color='#58fe9c' />
                <Button size="small" context='RESET' color='#ff7de3' />
            </div>
            <Form
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
            <div>
                <Input type="text" />
                <ColorPicker defaultValue="#1677ff" />
                <Button size="small" context='UPDATE' color='#ff7de3' />
            </div>
            <div>
                <Button size="small" context='GENERATE CARS' color='#ff7de3' />
            </div>
        </ControlLineWrapper>
    );
}

export default ControlLine;
