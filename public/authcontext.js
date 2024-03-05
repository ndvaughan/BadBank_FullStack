const AuthContext = React.createContext();

window.AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    React.createElement(AuthContext.Provider, { value: { user, login, logout } }, children)
  );
};

function useAuth() {
  return React.useContext(AuthContext);
};
