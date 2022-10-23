import postRoute from "../api/postRoute";
import { setToken } from "./loginToken";

const signOut = async () => {
    const res = await postRoute('/logout', {});
    setToken(null);

    return res;
};

export default signOut;