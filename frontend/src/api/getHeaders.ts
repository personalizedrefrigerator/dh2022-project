import { getToken } from "../helper/loginToken";

const getHeaders = () => {
    const token = getToken();
    const headers = {
        // See https://stackoverflow.com/questions/71234153/not-able-to-pass-json-data-using-fetch/
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
        Authorization: token ? `Bearer ${token}` : '',
    };

    return headers;
};

export default getHeaders;