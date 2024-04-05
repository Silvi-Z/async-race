import React, { useEffect, useState } from 'react';
import { NeonText } from '../../styled';
import { ConfigProvider, Table } from 'antd';
import {CarIcon} from "../../assets/car.js"

function Winners() {
    const [winners, setWinners] = useState()
    const getWinners = async () => {
        const response = await fetch(`http://localhost:3000/winners`);
        setWinners(await response.json());
    }

    useEffect(() => {
        getWinners()
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
            render: (_:any, record: { key: React.Key }) =>
                <CarIcon fill={"pink"}/>,
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'WINS',
            dataIndex: 'wins',
            key: 'wins',
        },
        {
            title: 'BEST TIME',
            dataIndex: 'time',
            key: 'time',
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
            <Table dataSource={winners} columns={columns} />;
        </ConfigProvider>
    );
}

export default Winners;
