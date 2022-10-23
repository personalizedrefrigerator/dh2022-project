import { Outlet } from 'react-router';
import Header from '../Header';
import './App.css';

const App = () => {
    // Outlet: Displays sub-components selected by react-router.
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default App;