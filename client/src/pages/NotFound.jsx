import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      {user ? (
        <Link to="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
      ) : (
        <Link to="/login">
          <button>Go to Login</button>
        </Link>
      )}
    </div>
  );
};

export default NotFound;
