import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import Layout from "./layout/default";
import Home from "./routes/Home";
import ToPlay from "./routes/ToPlay";
import Played from "./routes/Played";
import ErrorPage from "./error.page";
import NotFound from "./NotFound";
import "./assets/globals.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="games" errorElement={<ErrorPage />}>
        <Route path="toplay" element={<ToPlay />} />
        <Route path="played" element={<Played />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
