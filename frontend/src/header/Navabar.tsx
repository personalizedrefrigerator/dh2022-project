import Router from '../Router';
import './Navabar.css';

const Navabar = ({ router }: { router: Router }) => {
    return (
        <div className='navabar'>
            <div className='left'>
                <button className='navBtn'>Create Post</button>
                <button className='navBtn'>Profile</button>
            </div>
            <div className='right'>
                <button className='navBtn'>Login</button>
            </div>
        </div>
    )
}

export default Navabar;