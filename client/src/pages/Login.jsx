import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import BookIcon from "../assets/Icons/BookIcon.svg?react";
import MedalIcon from "../assets/Icons/MedalIcon.svg?react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, toast, setToast } = useAuth();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user);
      localStorage.setItem("token", res.data.token);

      setToast("Login Successful");
      setTimeout(() => {
        setToast("");
      }, 2000);

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setToast(err.response?.data?.message || "Login failed");
      setTimeout(() => {
        setToast("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard-main">
        <div className="main-container">
          <section className="left">
            <BookIcon className="icon" />
            <p>Don't have any account?</p>
            <Link to="/register">
              <button>SignUp</button>
            </Link>
          </section>
          <div className="right form-area">
            {loading ? (
              <>
                <Loader></Loader>
              </>
            ) : (
              <>
                <MedalIcon className="icon" />
                <form onSubmit={handleSubmit} className="login-form">
                  <h2>Login</h2>
                  <input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Link to="/forgot-password">Forgot Password</Link>
                  <button type="submit" className="form-btn">
                    Login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
