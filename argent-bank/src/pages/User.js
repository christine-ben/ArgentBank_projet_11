import { Navigate } from "react-router-dom";
import Account from "../components/Account";
import { useDispatch, useSelector } from "react-redux";
import {
  profileRequest,
  selectToken,
  selectProfile,
  usernameUpdateRequest,
  selectError,
  resetError,
  setErrorMessage,   // j'mporte depui slice userSlice
} from "../featuresUser/userSlice";
import { useEffect } from "react";

function User() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const profile = useSelector(selectProfile);
  const errorMessage = useSelector(selectError);

  const toggleForm = () => {
    dispatch(resetError())
    const editForm = document.getElementById("editForm");
    editForm.className === "edit-form"
      ? (editForm.className = "edit-form hidden")
      : (editForm.className = "edit-form");
  };

  const sendUpdate = (e) => {
    e.preventDefault();
    // Récupère le nom d'utilisateur en supprimant les espaces avant et après
    const updatedUsername = e.target.username.value.trim(); 
    if (updatedUsername === "" || /^\s+$/.test(updatedUsername)) {
      // Affiche un message d'erreur si le nom d'utilisateur est invalide
      dispatch(setErrorMessage("Le nom d'utilisateur ne peut pas être vide ou contenir uniquement des espaces."));
      return; // Arrête la soumission du formulaire
    }
    const payload = { token, updatedUsername };
    dispatch(usernameUpdateRequest(payload));
    toggleForm();
  };
  

  useEffect(() => {
    dispatch(profileRequest(token));
  }, [token, dispatch]);

  //UPDATE USERNAME
  if (!token) {
    return <Navigate replace to={"/sign-in"} />;
  } else {
    if (profile) {
      return (
        <>
          <main className="main bg-dark">
            <div className="header">
              <h1>
                Welcome back
                <br />
                {profile.firstName + " " + profile.lastName}
              </h1>
              <button
                className="edit-button"
                onClick={() => {
                  toggleForm();
                }}
              >
                Edit Name
              </button>
              <div className="edit-form hidden" id="editForm">
                <h2>Edit user info</h2>
                <form onSubmit={sendUpdate}>
                  <div className="input-wrapper">
                    <label htmlFor="username">User name : </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder={profile.userName}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="firstname">First name : </label>
                    <input
                      type="text"
                      id="firstname"
                      disabled
                      placeholder={profile.firstName}
                      
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="lastname">Last name : </label>
                    <input
                      type="text"
                      id="lastname"
                      disabled
                      placeholder={profile.lastName}
                    />
                  </div>
                  <div className="edit-submit">
                    <input
                      className="save-button edit-button"
                      type="submit"
                      value="Save"
                    ></input>
                    <input
                      className="cancel-button edit-button"
                      type="button"
                      value="Cancel"
                      onClick={() => {
                        toggleForm();
                      }}
                    ></input>
                  </div>
                </form>
                <div className="errorMessage">{errorMessage}</div>
              </div>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
              title="Argent Bank Checking (x8349)"
              amount="$2,082.79"
              description="Available Balance"
            />
            <Account
              title="Argent Bank Savings (x6712)"
              amount="$10,928.42"
              description="Available Balance"
            />
            <Account
              title="Argent Bank Credit Card (x8349)"
              amount="$184.30"
              description="Current Balance"
            />
          </main>
        </>
      );
    }
  }
}

export default User;