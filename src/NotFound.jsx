import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold">404</h1>
      <h1 className="text-3xl font-bold text-center">
        Sorry, the page you were looking for was not found.
      </h1>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
