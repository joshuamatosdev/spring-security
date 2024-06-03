import {SetStateAction} from 'react';
import axios from 'axios';

export const fetchHelloWorldString = async (url: string, token: string | undefined, setString: {
    (value: SetStateAction<string>): void;
}, label: string) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setString(response.data);
    } catch (error) {
        console.error(`Error fetching ${label} hello world string:`, error);
    }
}