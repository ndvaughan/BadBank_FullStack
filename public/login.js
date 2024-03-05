function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to login');
        }
        return response.json();
      })
      .then((userData) => {
        setStatus("");
        setShow(false);
        setLoggedIn(true);
        login(userData); // Pass user data to the login function
      })
      .catch((error) => {
        setStatus("Failed to login. Please check your credentials.");
        console.error("Login Error:", error);
      });
  };

  return (
    <Card
      bgcolor="secondary"
      header={loggedIn ? "Logout" : "Login"}
      status={status}
      body={
        loggedIn ? (
          <>
            <img src="bank.png" className="img-fluid" alt="Responsive image" />
            <br />
            <br />
            <h5>Success! You are logged in.</h5>
            <p>Please use the Navigation bar to browse your accounts!</p>
          </>
        ) : (
          <LoginForm
            setShow={setShow}
            setStatus={setStatus}
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password} // Pass email and password to the LoginForm component
          />
        )
      }
    />
  );
}

function LoginForm(props) {
  const { setShow, setStatus, handleLogin, setEmail, setPassword, email, password } = props;

  return (
    <>
      <img src="bank.png" className="img-fluid" alt="Responsive image" />
      <br />
      <br />
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email} // Set value attribute to email state
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password} // Set value attribute to password state
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button 
        type="submit" 
        className="btn btn-light" 
        onClick={handleLogin} 
        disabled={!email || !password}>
        Login
      </button>
    </>
  );
}
