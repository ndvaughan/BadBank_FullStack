function Home(){
  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="Create an account or login to an existing account to continue"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
