import { getToken } from "../helper/loginToken";

/**
 * Returns data as JSON fetched from the given route.
 */
const postRoute = async (route: string, data: any): Promise<any> => {
    const token = getToken();

    const resp = await fetch(route, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            // See https://stackoverflow.com/questions/71234153/not-able-to-pass-json-data-using-fetch/
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
            Authorization: token ? `Bearer ${token}` : '',
        },
        
    });
    console.assert(resp.ok);
    //DBG:
    //console.log('txt', await resp.text());
    return await resp.json();
};

export default postRoute;