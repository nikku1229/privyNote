import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookIcon from "../assets/Icons/BookIcon.svg?react";
import MedalIcon from "../assets/Icons/MedalIcon.svg?react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast, setToast } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
      setToast("Registration Successful");

      setTimeout(() => {
        setToast("");
      }, 2000);
    } catch (err) {
      setToast(err.response?.data?.message || "Registration failed");
      setTimeout(() => {
        setToast("");
      }, 2000);
    }
  };

  return (
    <div className="dashboard-main">
      <div className="main-container">
        <section className="left">
          <BookIcon className="icon" />
          <p>Already have an account?</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </section>
        <div className="right form-area">
          <MedalIcon className="icon" />
          <form onSubmit={handleSubmit} className="signup-form">
            <h2>SignUp</h2>
            <input
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit" className="form-btn">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
