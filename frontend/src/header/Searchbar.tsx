import { Form, useLoaderData } from "react-router-dom";
import fetchRoute from "../api/fetchRoute";
import './Searchbar.css'

interface LoaderResult {
    results: string[]; // Post IDs
    query: string;
}

export const searchLoader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    let results;
    try {
        // TODO: Request results from server.
        results = await fetchRoute('/search/' + encodeURIComponent(query ?? ''));
    } catch(e) {
        results = [];
        console.warn('Bad search data returned from server:', e);
    }

    if (!(typeof results === 'object' && results['length'] !== undefined)) {
        throw new Error(`Bad result from search query: ${results}`);
    }

    return { results, query };
};

const Searchbar = () => {
    const { results, query } = useLoaderData() as LoaderResult;

    return (
        <>
            <Form role="search">
                <input
                    id="query"
                    name="q"
                    placeholder="Search..."
                    defaultValue={query}
                />
                <input type="submit" id="searchBtn" value="Search"/>
            </Form>
            {results}
        </>
    );
}

export default Searchbar;