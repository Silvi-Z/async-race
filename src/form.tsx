import { Dispatch } from "redux";

interface Car {
    id: number;
    name: string;
    return: () => void
  }
  

export const performApiRequest = async (url:string, method:string, body:object) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
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
    }
  };