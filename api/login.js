import axios from "axios";
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

export async function login(idToken) {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/user/login`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error(error.response?.data || error.message); 
    }
}
