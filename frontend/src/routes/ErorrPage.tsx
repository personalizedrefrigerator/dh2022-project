import { useRouteError } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            <h1>Error!</h1>
            <pre>{JSON.stringify(error)}</pre>
        </>
    );
};

export default ErrorPage;