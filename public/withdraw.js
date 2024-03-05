function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState(""); // New state for balance
  const { user } = useAuth(); // Accessing the logged-in user's information

  return (
    <Card
      bgcolor="secondary"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} setBalance={setBalance} user={user} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} balance={balance} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <img src="bank.png" className="img-fluid" alt="Responsive image" />
      <br />
      <br />
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
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const { user } = useAuth();

  function handle() {
    if (email !== user.email) {
      props.setStatus("Incorrect user email");
      return;
    }

    fetch(`/account/update/${email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          props.setBalance(data.value.balance); // Update balance in Withdraw component
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Withdraw failed");
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
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle} disabled={!email || !amount}>
        Withdraw
      </button>
    </>
  );
}
