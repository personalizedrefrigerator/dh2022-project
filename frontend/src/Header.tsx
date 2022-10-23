import Navabar from './header/Navabar'
import Searchbar from './header/Searchbar'
import TagList from './header/TagList'
import Router from './Router';

const Header = ({ router }: { router: Router }) => {
    return (
        <>
            <Navabar router={router} />
            <Searchbar/>
            <TagList/>
        </>
    );
};

export default Header;