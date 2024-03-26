import { Link } from "react-router-dom";
import Logo from "../assets/image/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { selectProfile, selectToken, logout } from "../featuresUser/userSlice";

function Nav() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const token = useSelector(selectToken)

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {token ? (
        <div>
          <Link className="main-nav-item" to="/user">
          <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} />
            {" " + profile?.userName}
          </Link>
          <Link
            className="main-nav-item"
            to="/"
            onClick={() => dispatch(logout())}
          >
            <FontAwesomeIcon className="sign-in-icon" icon={faRightFromBracket} />
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/sign-in">
          <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;