import { useCallback, useRef, useState } from "react";
import postRoute from "../api/postRoute";
import { setToken, useToken } from "../helper/loginToken";
import signOut from "../helper/signOut";

const LogIn = () => {
    const [ emailRef, setEmailRef ] = useState<HTMLInputElement|null>(null);
    const [ passboxRef, setPassboxRef ] = useState<HTMLInputElement|null>(null);
    const [ status, setStatus ] = useState<string|null>(null);

    const token = useToken();

    const submit = useCallback(() => {
        if (!emailRef || !passboxRef) {
            return;
        }

        const email = emailRef.value;
        const password = passboxRef.value;

        const doSubmit = async () => {
            const result = await postRoute('/token', {
                email, password,
            });
            setToken(result.access_token);
            setStatus(result?.msg);
        };

        doSubmit();
    }, [ passboxRef, emailRef]);

    const signInContent = (
        <div>
            <fieldset><legend>Sign Up</legend>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input ref={setEmailRef} id='email' type='email'/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input ref={setPassboxRef} id='password' type='password'/>
                </div>
                <div id="status" style={{
                    display: status !== null ? 'block' : 'none'
                }}>
                    {status}
                </div>
                <button onClick={submit}>Okay</button>
            </fieldset>
        </div>
    );

    const signedInContent = (
        <div>
            <h1>Signed in!</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );

    return token ? signedInContent : signInContent;
};

export default LogIn;