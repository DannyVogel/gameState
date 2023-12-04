import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="mt-10 flex flex-col justify-center items-center gap-8 font-bold"
    >
      <h1 className="text-3xl">Oops!</h1>
      <p className="">Sorry, an unexpected error has occurred.</p>
      <p className="text-center">
        <i>Error: {error.statusText || error.message}</i>
      </p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
