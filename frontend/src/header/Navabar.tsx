import { Link } from 'react-router-dom';
import { useToken } from '../helper/loginToken';
import signOut from '../helper/signOut';
import './Navabar.css';

const Navabar = () => {
    const profile = <Link to={'profile'} className='navBtn'>Profile</Link>
    const login = <Link to={'login'} className='navBtn'>Login</Link>;
    const signUp = <Link to={'sign-up'} className='navBtn'>Sign Up</Link>;
    const signedOutBtns = (
        <>
            {login} {signUp}
        </>
    );
    const signedInBtns = (
        <>
            {profile}
            <button onClick={signOut}>Sign Out</button>
        </>
    );

    const userLoggedIn = useToken() !== null; // Dummy variable, needs changing
    const rightBtn = userLoggedIn ? signedInBtns : signedOutBtns;
    return (
        <div className='navabar'>
            <div className='left'>
                <Link to={'/'} className='navBtn'>Home</Link>
                <Link to={'new-post'} className='navBtn'>Create Post</Link>
            </div>
            <div className='right'>
                {rightBtn}
            </div>
        </div>
    );
}

export default Navabar;