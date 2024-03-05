function CreateAccount(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const { login } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validateName(name) {
    const regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    return regex.test(name);
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  function handle() {
    if (!validateName(name)) {
      setStatus("Invalid name");
      return;
    }
    if (!validateEmail(email)) {
      setStatus("Invalid email");
      return;
    }
    if (!validatePassword(password)) {
      setStatus("Password must be at least 8 characters long");
      return;
    }
  
    const url = `/account/create/${name}/${email}/${password}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User already exists or an error occurred");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setShow(false);
        login(data.userData);
  
        setName("");
        setEmail("");
        setPassword("");
        setStatus("");
      })
      .catch((error) => {
        console.error("Error creating account:", error.message);
        setStatus(error.message);
      });
  }
  
  

  return (
    <Card
      bgcolor="secondary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm
            setShow={setShow}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handle={handle}
          />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const { name, setName, email, setEmail, password, setPassword, handle } =
    props;

  return (
    <>
      <img src="bank.png" className="img-fluid" alt="Responsive image" />
      <br />
      <br />
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={!name || !email || !password}
      >
        Create Account
      </button>
    </>
  );
}
