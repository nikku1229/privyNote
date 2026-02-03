import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    await API.post(`/auth/reset-password/${token}`, { password });
    alert("Password updated");
  };

  return (
    <div className="auth-box">
      <h2>New Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submitHandler}>Update Password</button>
    </div>
  );
};

export default ResetPassword;
