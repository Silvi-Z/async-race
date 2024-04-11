import React, { useMemo, useState } from 'react';
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
import { getCarsForm, performApiRequest, startCarRace } from '../../form';
import { useDispatch } from 'react-redux';

type FieldType = {
    name?: string;
    color?: string;
};
interface ControlLineProps {
    currentPage: number;
    id: number;
    start: ()=>void
}
type Color = GetProp<ColorPickerProps, 'value'>;

const ControlLine: React.FC<ControlLineProps> = ({ start, currentPage, id }) => {
    const dispatch = useDispatch()
    const [color, setColor] = useState<Color>('');
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();

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
        await getCarsForm(currentPage, dispatch)
    };

    const updateCar: FormProps<FieldType>["onFinish"] = async (values) => {
        await performApiRequest(`http://localhost:3000/garage/${id}`, "PUT", {
            name: values.name,
            color: changedColor
        })
        updateForm.resetFields();
        await getCarsForm(currentPage, dispatch)
    };


    return (
        <ControlLineWrapper>
            <div>
                <Button onClick={()=> start()} size="small" context='RACE' color='#58fe9c' />
                <Button size="small" context='RESET' color='#ff7de3' />
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
            <div>
                <Button size="small" context='GENERATE CARS' color='#ff7de3' />
            </div>
        </ControlLineWrapper>
    );
}

export default ControlLine;
