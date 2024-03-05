// NavBar.js

function NavBar() {
  const { user, logout } = useAuth();
  const [notification, setNotification] = React.useState(false);

  const handleLogout = () => {
    logout();
    setNotification(true);

    setTimeout(() => {
      setNotification(false);
      window.location.href = "#/"; // Redirect to home page
    }, 5000);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {user ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance/">
                  Balance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/alldata/">
                  AllData
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/CreateAccount/">
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login/">
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
        {user && (
          <div className="navbar-nav">
            <span className="navbar-text mr-3">
              {user.name} - {user.email}
            </span>
            <button className="btn btn-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {notification && (
        <Card
          bgcolor="secondary"
          status="You have been successfully logged out. Please login again or create a new account to continue"
        />
      )}
    </nav>
  );
}
