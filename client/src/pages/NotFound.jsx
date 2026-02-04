import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import BookIcon from "../assets/Icons/BookIcon.svg?react";
import MedalIcon from "../assets/Icons/MedalIcon.svg?react";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-main">
      <div className="main-container">
        <section className="left">
          <BookIcon className="icon" />
          {user ? (
            <Link to="/dashboard">
              <button>Go to Dashboard</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Go to Login</button>
            </Link>
          )}
        </section>
        <section className="right">
          <MedalIcon className="icon" />
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
