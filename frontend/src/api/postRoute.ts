
/**
 * Returns data as JSON fetched from the given route.
 */
const postRoute = async (route: string, data: any): Promise<any> => {
    const resp = await fetch(route, {
        method: "POST",
        body: JSON.stringify(data),
    });
    console.assert(resp.ok);
    console.log('txt', await resp.text());
    return await resp.json();
};

export default postRoute;