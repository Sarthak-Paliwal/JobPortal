import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthenticateRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (user === null) {
      // User not logged in, redirect to login
      navigate('/login');
      return;
    }
    
    // Check if user has student role
    if (user.role !== 'student') {
      // User is logged in but not a student, redirect to login
      navigate('/login');
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

export default AuthenticateRoutes; 