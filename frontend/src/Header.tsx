import Navabar from './header/Navabar';
import Searchbar from './header/Searchbar';
import TagList from './header/TagList';
import './Header.css';

const Header = () => {
    return (
        <header>
            <Navabar />
            <div className='nonNav'>
                <Searchbar/>
                <TagList/>
            </div>
        </header>
    );
};

export default Header;