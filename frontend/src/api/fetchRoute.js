
/**
 * Returns data as JSON fetched from the given route.
 */
export default async (route) => {
    const resp = await fetch(route);
    console.assert(resp.ok);
    return resp.json();
};