import React from 'react';
import {
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import {
  router,
  GlobalNav
} from './api/NavBar'

function RouterHandler(): React.JSX.Element {
  return (
    <>
      <GlobalNav />
      <div style={{'margin': '2%'}}>
        <RouterProvider router={router} />
        </div>
    </>
  );
}

export default RouterHandler;
