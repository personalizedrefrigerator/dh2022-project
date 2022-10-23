import { useEffect, useState } from "react";
import fetchRoute from "../api/fetchRoute";

export default function useData<T>(route: string): T[] {
    const [ data, setData ] = useState<T[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let data: T[] | undefined;

            try {
                data = await fetchRoute(route);
            } catch(e) {
                console.warn('unable to fetch data!', e);
            }

            if (!data) {
                return;
            }
            if (data['length'] === undefined) {
                throw new Error('Not an array');
            }
            
            setData(data);
        };
        fetchData();
    }, [setData]);

    return data
}