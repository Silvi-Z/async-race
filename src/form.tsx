import { Dispatch } from "redux";

interface Car {
    id: number;
    name: string;
}
  
export const performApiRequest = async (url: string, method: string, body: object) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response.json(); 
    } catch (error) {
        throw error;
    }
};

export const getCarsForm = async (
    dispatch: Dispatch<any>,
    limit?: boolean,
    currentPage?: number
): Promise<Car[]> => {
    try {
        const response = await fetch(
            limit ? `http://localhost:3000/garage?_page=${currentPage}&_limit=7`
            : `http://localhost:3000/garage`
        );
        const carsData: Car[] = await response.json();
        if(limit){
            dispatch({ type: "CARS", val: carsData });
            dispatch({ type: "TOTAL", val: response.headers.get("X-Total-Count") });
        }
            return carsData
    } catch (error) {
        throw error;
    }
};

export const startCarRace = async (id: number, status: string, signal?: AbortSignal) => {
    try {
        const res = await performApiRequest(
            `http://localhost:3000/engine?id=${id}&status=${status}`,
            "PATCH",
            {signal},
        );
        return res?.success || [Math.floor((res.distance / res.velocity) / 1000), id];
    } catch (error) {
        return false;
    }
};
