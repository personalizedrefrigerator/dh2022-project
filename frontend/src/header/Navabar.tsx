import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Navabar.css';

const Navabar = () => {
    return (
        <div className='navabar'>
            <div className='left'>
                <Link to={'new-post'}>Create Post</Link>
                <Link to={'profile'} className='navBtn'>Profile</Link>
            </div>
            <div className='right'>
                <Link to={'login'} className='navBtn'>Login</Link>
            </div>
        </div>
    );
}

export default Navabar;