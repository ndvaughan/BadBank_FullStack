function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const { user } = useAuth(); // Accessing the logged-in user's information

  return (
    <Card
      bgcolor="secondary"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm
            setShow={setShow}
            setStatus={setStatus}
            setBalance={setBalance}
            user={user}
          />
        ) : (
          <BalanceMsg
            setShow={setShow}
            setStatus={setStatus}
            balance={balance}
          />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      {props.balance !== "" && <p>Available balance: ${props.balance}</p>}
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");
  const { user } = useAuth();

  function handle() {
    if (!user || email !== user.email) { // Add a null check for user
      props.setStatus("Incorrect user email");
      return;
    }

    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const userData = JSON.parse(text);
          props.setStatus("");
          props.setShow(false);
          props.setBalance(userData.balance); // Update balance in Balance component
          console.log("JSON:", userData);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", text);
        }
      });
  }

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
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle} disabled={!email} >
        Check Balance
      </button>
    </>
  );
}
