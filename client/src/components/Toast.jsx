import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

function Toast() {
  const { toast } = useAuth();
  return <>{toast ? <div className="toast">{toast}</div> : <></>}</>;
}

export default Toast;
