import { Link } from 'react-router-dom';
import './Navabar.css';

const Navabar = () => {
    const profile = <Link to={'profile'} className='navBtn'>Profile</Link>
    const login = <Link to={'login'} className='navBtn'>Login</Link>;

    const userLoggedIn = true // Dummy variable, needs changing
    const rightBtn = userLoggedIn ? profile : login;
    return (
        <div className='navabar'>
            <div className='left'>
                <Link to={'home'} className='navBtn'>Home</Link>
                <Link to={'new-post'} className='navBtn'>Create Post</Link>
            </div>
            <div className='right'>
                {rightBtn}
            </div>
        </div>
    );
}

export default Navabar;