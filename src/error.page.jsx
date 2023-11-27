import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center gap-8 min-h-screen font-bold"
    >
      <h1 className="text-3xl">Oops!</h1>
      <p className="">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Error: {error.statusText || error.message}</i>
      </p>
    </div>
  );
}
