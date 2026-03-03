import { useLoading } from "../context/LoadingContext";

function Loader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="global-loader">
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
