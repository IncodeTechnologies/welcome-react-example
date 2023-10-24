import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import AppWithStyles from "./AppWithStyles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/AppWithStyles",
    element: <AppWithStyles />,
  },
]);

const container = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  container
);
