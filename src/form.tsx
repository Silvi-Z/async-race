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