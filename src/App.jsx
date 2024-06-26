import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./layout/default";
import Home from "./routes/Home";
import Search, { loader as searchLoader } from "./routes/Search";
import ToPlay from "./routes/ToPlay";
import Played from "./routes/Played";
import ErrorPage from "./error.page";
import NotFound from "./NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route
        path="search/:searchTerm"
        element={<Search />}
        loader={searchLoader}
      />
      <Route path="toplay" element={<ToPlay />} />
      <Route path="played" element={<Played />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
