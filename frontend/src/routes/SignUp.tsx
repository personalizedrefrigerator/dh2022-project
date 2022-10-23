import { useCallback, useRef, useState } from "react";
import postRoute from "../api/postRoute";

const SignUp = () => {
    const [ emailRef, setEmailRef ] = useState<HTMLInputElement|null>(null);
    const [ usernameRef, setUsernameRef ] = useState<HTMLInputElement|null>(null);
    const [ passbox1Ref, setPassbox1Ref ] = useState<HTMLInputElement|null>(null);
    const [ passbox2Ref, setPassbox2Ref ] = useState<HTMLInputElement|null>(null);
    const [ firstNameRef, setFirstnameRef ] = useState<HTMLInputElement|null>(null);
    const [ lastNameRef, setLastNameRef ] = useState<HTMLInputElement|null>(null);
    const [ status, setStatus ] = useState<string|null>(null);

    const onPassswordChange = useCallback(() => {
        if (!passbox1Ref || !passbox2Ref) {
            return false;
        }

        if (passbox1Ref.value !== passbox2Ref.value) {
            setStatus("Passwords don't match!");
            console.error(passbox1Ref.value, passbox2Ref.value);
            return false;
        }

        if (passbox1Ref.value.length < 8) {
            setStatus("Password too short");
            return false;
        }

        setStatus(null);
        return true;
    }, [ passbox1Ref, passbox2Ref ]);

    const submit = useCallback(() => {
        // Validate password format
        if (!onPassswordChange() || !usernameRef || !emailRef || !passbox1Ref || !firstNameRef || !lastNameRef) {
            return;
        }

        const password = passbox1Ref.value;
        const username = usernameRef.value;
        const email = emailRef.value;
        const firstname = firstNameRef.value;
        const lastname = lastNameRef.value;

        const doSubmit = async () => {
            const result = await postRoute('/new-account', {
                email, username, firstname, lastname, password,
            });
            setStatus(result?.msg);
        };

        doSubmit();

    }, [ passbox1Ref, passbox2Ref, usernameRef, emailRef]);

    return (
        <div>
            <fieldset><legend>Sign Up</legend>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input ref={setEmailRef} id='email' type='email'/>
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input ref={setUsernameRef} id='username' type='text'/>
                </div>
                <div>
                    <label htmlFor="firstname">First name:</label>
                    <input ref={setFirstnameRef} id='firstname' type='text'/>
                </div>
                <div>
                    <label htmlFor="lastname">Last name:</label>
                    <input ref={setLastNameRef} id='lastname' type='text'/>
                </div>
                <div>
                    <label htmlFor="password1">Password:</label>
                    <input onChange={onPassswordChange} ref={setPassbox1Ref} id='password1' type='password'/>
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input onChange={onPassswordChange} ref={setPassbox2Ref} id='password2' type='password'/>
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
};

export default SignUp;