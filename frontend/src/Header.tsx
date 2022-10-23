import Navabar from './header/Navabar';
import Searchbar from './header/Searchbar';
import TagList from './header/TagList';
import './Header.css';

const Header = () => {
    return (
        <header>
            <Navabar />
            <Searchbar/>
            <TagList/>
        </header>
    );
};

export default Header;