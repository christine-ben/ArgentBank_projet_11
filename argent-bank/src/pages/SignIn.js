import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import {
  loginRequest,
  selectError,
  selectToken,
} from "../featuresUser/userSlice";

function SignIn() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectError);
  const token = useSelector(selectToken);

  const loginTest = (e) => {
    e.preventDefault();
    dispatch(loginRequest(new FormData(e.target)));
  };

  if (token) {
    return <Navigate replace to={"/user"} />;
  } else {
    return (
      <>
        <main className="main bg-dark">
          <section className="sign-in-content">
          <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} />
            <h1>Sign In</h1>
            <form onSubmit={loginTest}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <input
                className="sign-in-button"
                type="submit"
                value="Sign In"
              ></input>
            </form>
            <div className="errorMessage">{errorMessage}</div>
          </section>
        </main>
      </>
    );
  }
}
export default SignIn;