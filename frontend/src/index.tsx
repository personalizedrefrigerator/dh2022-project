import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErorrPage';
import ProfileView from './routes/ProfileView';
import App from './routes/App';
import { searchLoader } from './header/Searchbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    loader: searchLoader,
    children: [
      {
        element: <Home/>,
        index: true,
      },
      {
        path: "profile",
        element: <ProfileView/>,
      }
    ],
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
