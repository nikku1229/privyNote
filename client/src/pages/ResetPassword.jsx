import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import BookIcon from "../assets/Icons/BookIcon.svg?react";
import MedalIcon from "../assets/Icons/MedalIcon.svg?react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const { setToast } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/auth/reset-password/${token}`, { password });

      setToast("Password Updated");
      setTimeout(() => {
        setToast("");
      }, 2000);
      setPassword("");
    } catch (err) {
      setToast(err.response?.data.message || "Sometime went wrong");
      setTimeout(() => {
        setToast("");
      }, 2000);
    }
  };

  return (
    <>
      <div className="dashboard-main">
        <div className="main-container">
          <section className="left">
            <BookIcon className="icon" />
            <Link to="/">
              <button>Home</button>
            </Link>
          </section>

          <div className="right form-area">
            <MedalIcon className="icon" />

            <form className="login-form" onSubmit={submitHandler}>
              <h2>New Password</h2>
              <input
                placeholder="Enter new password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="form-btn">
                Update password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
