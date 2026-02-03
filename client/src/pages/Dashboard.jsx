import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookIcon from "../assets/Icons/BookIcon.svg?react";
import MedalIcon from "../assets/Icons/MedalIcon.svg?react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="dashboard-main">
      <div className="main-container">
        <section className="left">
          <BookIcon className="icon" />
          <Link to="/diary">
            <button>Open Diary</button>
          </Link>
        </section>
        <section className="right">
          <MedalIcon className="icon" />
          {user ? (
            <>
              <h1>
                Welcome back, <span className="logo-font">{user.name}!</span>
              </h1>
              <p>Your private place to think, write, and reflect.</p>
            </>
          ) : (
            <>
              <h1>Hello!</h1>
              <p>Please login to open your diary</p>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
