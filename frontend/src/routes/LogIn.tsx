import { useCallback, useRef, useState } from "react";
import postRoute from "../api/postRoute";
import { setToken, useToken } from "../helper/loginToken";
import signOut from "../helper/signOut";
import './InputFields.css'

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

            if (result.access_token) {
                setToken(result.access_token);
            } else {
                setToken(null);
            }
            setStatus(result?.msg);
        };

        doSubmit();
    }, [ passboxRef, emailRef]);

    const signInContent = (
        <div>
            <fieldset><legend>Log In</legend>
                <div>
                    <label htmlFor="email">Email: </label>
                    
                </div>
                <div>
                    <input ref={setEmailRef} className='field' id='email' type='email'/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                </div>
                <div>
                    <input ref={setPassboxRef} className='field' id='password' type='password'/>
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