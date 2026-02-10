// auth.js
import React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const adminList = ['Irisval', 'RetaxMaster', 'freddier'];

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  const login = ({ username }) => {
    const isAdmin = adminList.includes(username);
    setUser({ username, isAdmin });

    // Recuperamos la ruta original desde el state
    let from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };
  
  const logout = () => {
    setUser(null);
    navigate('/');
  };
  
  const auth = { user, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Guardamos la ruta original en state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
}

export {
  AuthProvider,
  AuthRoute,
  useAuth,
};
