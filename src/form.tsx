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
    currentPage: number,
    dispatch: Dispatch<any>
): Promise<void> => {
  console.log('currentPage',currentPage)
    try {
        const response = await fetch(
            `http://localhost:3000/garage?_page=${currentPage}&_limit=7`
        );
        const carsData: Car[] = await response.json();
        dispatch({ type: "CARS", val: carsData });
        dispatch({ type: "TOTAL", val: response.headers.get("X-Total-Count") });
    } catch (error) {
        throw error; // Re-throw the error to be handled by caller
    }
};

export const startCarRace = async (id: number, status: string) => {
    try {
        const res = await performApiRequest(
            `http://localhost:3000/engine?id=${id}&status=${status}`,
            "PATCH",
            {}
        );
        return res?.success || [Math.floor((res.distance /res.velocity) / 1000), id];
    } catch (error) {
        return false
    }
};
