import React from 'react';
import Button from '../Button';
import { ColorPicker, Input } from 'antd';
import { ControlLineWrapper } from '../../styled';


function ControlLine() {

    return (
        <ControlLineWrapper>
            <div>
                <Button size="small" context='RACE' color='#58fe9c' />
                <Button size="small" context='RESET' color='#ff7de3' />
            </div>
            <div>
                <Input type="text" />
                <ColorPicker defaultValue="#1677ff" />
                <Button size="small" context='CREATE' color='#ff7de3' />
            </div>
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
