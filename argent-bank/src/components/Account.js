function Account(props) {
     // Extraction des propriétés pour une meilleure lisibilité
  const { title, amount, description } = props;
    return (
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    );
  }
   
  export default Account
  //pour afficher les détails du compte. 