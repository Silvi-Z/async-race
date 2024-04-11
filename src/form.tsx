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

      

        return response.json(); // Return parsed JSON response
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('API key')) {
            console.error('Invalid API key:', error);
        } else {
            console.error('There was a problem with the Fetch operation:', error);
        }
        throw error; // Re-throw the error to be handled by caller
    }
};

export const getCarsForm = async (
    currentPage: number,
    dispatch: Dispatch<any>
): Promise<void> => {
    try {
        const response = await fetch(
            `http://localhost:3000/garage?_page=${currentPage}&_limit=7`
        );

      
        const carsData: Car[] = await response.json();
        dispatch({ type: "CARS", val: carsData });
        dispatch({ type: "TOTAL", val: response.headers.get("X-Total-Count") });
    } catch (error) {
        console.error("Error:", error);
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
        console.error("Error:", error);
        return false
    }
};
