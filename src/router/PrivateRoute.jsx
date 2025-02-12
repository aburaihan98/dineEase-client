import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading";
import { AuthContext } from "../provider/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <Navigate state={pathname} to="/login"></Navigate>
    </div>
  );
}
