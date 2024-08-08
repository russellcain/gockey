import React from 'react';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Link
} from "react-router-dom";

import PlayerPage from "./player/PlayerPage"
import { Button } from '@mui/material';

let pages: RouteObject[] = [
  {
    path: '/league',
    element: <h1>Welcome to the league page</h1>
    },
  {
    path: '/players',
    element: <PlayerPage />
    },
  {
    path: '/teams',
    element: <h1>Welcome to the teams page</h1>
  },
]

pages = [{path: '', element: <h1>Welcome Home</h1>}, ...pages]

const router = createBrowserRouter(pages)




function PathButton(page: RouteObject): JSX.Element {
  return <Button href={page.path} variant="contained" color="primary">
      {page.path}
    </Button>
}

function RouterHandler(): React.JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
        <div>Here are some pages: </div>
        <ul>
          {pages.map((page: RouteObject) => (<PathButton key={page.path} {...page} />))}
        </ul>
    </>
  );
}

export default RouterHandler;
