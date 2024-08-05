import React from 'react';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from "react-router-dom";


const pages: string[] = ['league', 'players', 'teams']

let routes: RouteObject[] = pages.map((value) => {
  return (
    {
      path: `/${value}`,
      element: <h1>Welcome to {value} </h1>
    }
  )
  }
)

routes = [{path: '', element: <h1>Welcome Home</h1>}, ...routes]

const router = createBrowserRouter(
  routes
)

function PathButton(props): JSX.Element {
  return <a href={props.path_name}>Visit {props.path_name}</a>;
}

let name: string = 'Rusty?'
function RouterHandler(): React.JSX.Element {
  return (
    <>
      <div>Here are some pages: </div>
      <ul>
        {pages.map((name, index) => (<PathButton key={index} path_name={name} />))}
      </ul>
      <RouterProvider router={router} />
    </>
  );
}

export default RouterHandler;
