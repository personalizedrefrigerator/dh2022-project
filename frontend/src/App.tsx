import { ReactNode, useMemo, useState } from 'react';
import './App.css';

import Home from './Home';
import ProfileView from './ProfileView';
import Router from './Router';

function App() {
  const [ page, setPage ] = useState<ReactNode>(null);

  // Provides page navigation
  const router = useMemo(() => {
    return new Router(page => setPage(page));
  }, [setPage]);


  const pageMap = useMemo(() => {
    const pageMap = {
      'home': <Home router={router}/>,
      'profile': <ProfileView/>
    };

    setPage(pageMap.home);

    return pageMap;
  }, [ router ]);
  router.setPageMap(pageMap);

  return (
    <>
      {page}
    </>
  );
}

export default App;
