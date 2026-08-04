import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-text">Page not found</h1>
        <p className="mt-3 text-base text-text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/chats"
          className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
        >
          Go to chats
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
