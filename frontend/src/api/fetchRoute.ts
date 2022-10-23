import getHeaders from "./getHeaders";

/**
 * Returns data as JSON fetched from the given route.
 */
const fetchRoute = async (route: string): Promise<any> => {
    const resp = await fetch(route, {
        headers: getHeaders(),
    });
    console.assert(resp.ok);
    return await resp.json();
};

export default fetchRoute;
