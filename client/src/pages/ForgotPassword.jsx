import { useState } from "react";
import API from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const submitHandler = async () => {
    const res = await API.post("/auth/forgot-password", { email });
    setToken(res.data.token);
  };

  return (
    <div className="auth-box">
      <h2>Forgot Password</h2>

      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={submitHandler}>Generate Reset Link</button>

      {token && (
        <p>
          Reset Link:
          <br />
          <a href={`/reset-password/${token}`}>
            /reset-password/{token}
          </a>
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
