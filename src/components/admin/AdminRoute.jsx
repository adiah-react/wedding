import { Navigate, useLocation } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";

const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated, isLoading } = useAdmin();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-px w-24 bg-gray-300 mb-4"></div>
          <span className="font-serif text-xl text-gray-400">
            Loading Admin...
          </span>
          <div className="h-px w-24 bg-gray-300 mt-4"></div>
        </div>
      </div>
    );
  }
  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }
  return <>{children}</>;
};

export default AdminRoute;
