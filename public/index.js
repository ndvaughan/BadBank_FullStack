function Spa() {  
  const [user, setUser] = React.useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <div>
        <AuthProvider value={{ user, login, logout }}>
          <NavBar />
          <UserContext.Provider value={{ users: [{}] }}>
            <div className="container" style={{ padding: "40px" }}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </UserContext.Provider>
        </AuthProvider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa />,
  document.getElementById('root')
);
