import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import ProfileView from './routes/ProfileView';
import App from './routes/App';
import { searchLoader } from './header/Searchbar';
import CreatePost from './createPost/CreatePost';
import SignUp from './routes/SignUp';
import LogIn from './routes/LogIn';
import PostView, { postLoader } from './routes/PostView';

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
        element: <ProfileView/>, // TODO: replace with real user
      },
      {
        path: "new-post",
        element: <CreatePost/>,
      },
      {
        path: "posts/:postId",
        loader: postLoader,
        element: <PostView/>,
      },
      {
        path: 'sign-up',
        element: <SignUp/>
      },
      {
        path: 'login',
        element: <LogIn/>
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
