import { Navigate, useLocation } from "react-router";
import { useInvitation } from "../../hooks/useInvitation";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useInvitation();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-px w-24 bg-gray-200 mb-4"></div>
          <span className="front-serif text-xl text-gray-400">Loading...</span>
          <div className="h-px w-24 bg-gray-200 mt-4"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to

    return <Navigate to="/invite" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
