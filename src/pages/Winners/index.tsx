import React, { useEffect, useState } from 'react';
import { NeonText } from '../../styled';
import { ConfigProvider, Table } from 'antd';
import { CarIcon } from "../../assets/car.js"
import { getCarsForm } from '../../form';
import { useDispatch } from 'react-redux';
export interface Car {
    id: number;
    name: string;
    color?: string
}

function Winners() {

    const dispatch = useDispatch()
    const [winners, setWinners] = useState()
    const [cars, setCars] = useState<Car[]>([]);
    const getWinners = async () => {
        const response = await fetch(`http://localhost:3000/winners`);
        setWinners(await response.json());
    }

    const getCars = async () => {
        const res = await getCarsForm(dispatch, false);
        setCars(res);
    };

    useEffect(() => {
        getWinners()
        getCars()
    }, [])
    const columns = [
        {
            title: 'N',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'CAR',
            dataIndex: 'car',
            key: 'car',
            render: (_:any, car: {[x: string]: any; key: string | number}) =>
                <CarIcon fill={cars.find((item:any)=>item.id === car.id)?.color}/>
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: (_:any, car: {[x: string]: any; key: string | number}) =>
            cars.find((item:any)=>item.id === car.id)?.name
        },
        {
            title: 'WINS',
            dataIndex: 'wins',
            key: 'wins',
            sorter: (a:any, b:any) => a.wins - b.wins,
        },
        {
            title: 'BEST TIME',
            dataIndex: 'time',
            key: 'time',
            sorter: (a:any, b:any) => a.time - b.time,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: "transparent",
                    colorText: "white",
                },
                components: {
                    Table: {
                        bodySortBg: "transparent",
                        borderColor: "transparent",
                        headerSplitColor: "#f804c4"

                    }
                },
            }}
        >
            <NeonText color={'#f804c4'}>Winners</NeonText>
            <Table  showSorterTooltip={{ target: 'sorter-icon' }} dataSource={winners} columns={columns} />;
        </ConfigProvider>
    );
}

export default Winners;
