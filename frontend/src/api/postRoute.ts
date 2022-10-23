import { getToken } from "../helper/loginToken";
import getHeaders from "./getHeaders";

/**
 * Returns data as JSON fetched from the given route.
 */
const postRoute = async (route: string, data: any): Promise<any> => {
    const token = getToken();

    const resp = await fetch(route, {
        method: "POST",
        body: JSON.stringify(data),
        headers: getHeaders(),
    });
    console.assert(resp.ok, 'response not okay');
    //DBG:
    //console.log('txt', await resp.text());
    return await resp.json();
};

export default postRoute;