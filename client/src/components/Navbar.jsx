import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, setToast } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();

    setToast("Logout Successful");
    setTimeout(() => {
      setToast("");
    }, 2000);
    navigate("/login");
  };

  return (
    <nav className="header">
      <div className="main-container">
        <div className="header-content">
          <Link to="/">
            <h3>PrivyNote</h3>
          </Link>

          <div className="nav-actions">
            {user ? (
              <>
                {location.pathname === "/" ? (
                  <Link to="/diary">Diary</Link>
                ) : (
                  <Link to="/">Dashboard</Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <div className="header-btn">
                  {location.pathname === "/login" ||
                  location.pathname === "/register" ? (
                    <>
                      <Link to="/">Dashboard</Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        SignUp
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
