import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import BookIcon from "../assets/Icons/BookIcon.svg?react";
import MedalIcon from "../assets/Icons/MedalIcon.svg?react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");
  const { setToast } = useAuth();
  const { loading, setLoading } = useLoading();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/auth/forgot-password", { email });
      // setToken(res.data.token);
      setToast("Reset link send to mail");
      setTimeout(() => {
        setToast("");
      }, 2000);
    } catch (err) {
      setToast(err.response?.data.message || "Sometimes went wrong");
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
            <Link to="/">
              <button>Home</button>
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

                <form className="login-form" onSubmit={submitHandler}>
                  <h2>Forgot Password</h2>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="form-btn">
                    Generate Reset Link
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

export default ForgotPassword;
