import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <h1>Welcome back, {user?.name} ✨</h1>
      <p>Your private place to think, write, and reflect.</p>

      <Link to="/diary">
        <button style={{ marginTop: "1.5rem" }}>Open Diary</button>
      </Link>
    </div>
  );
};

export default Dashboard;
