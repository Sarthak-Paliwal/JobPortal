import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has recruiter role
    if (user === null) {
      // User not logged in, redirect to login
      navigate('/login');
      return;
    }
    
    if (user.role !== 'recruiter') {
      // User is logged in but not a recruiter, redirect to home
      navigate('/');
      return;
    }
    
    // User is authorized
    setIsAuthorized(true);
  }, [user, navigate]);

  // Show loading or redirect while checking authorization
  if (!isAuthorized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoutes;