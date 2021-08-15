import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import logo from "../images/VayyarDevelopers.png";
import "./NavigationBar.scss";
import { Link } from "react-router-dom";
import { loginRequest } from "../authConfig";

export const NavigationBar = () => {
  const { instance } = useMsal();

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <>
      <div className="nav-bar" bg="primary" variant="dark">
        <a href="/" className="nav-bar--logo">
          <img src={logo} /> 
        </a>
        <AuthenticatedTemplate>
          <div className="nav-bar--links">
            <Link to="/profile">Profile</Link>
            <button
              className="nav-bar--sign-in"
              onClick={() =>
                instance.logoutPopup({
                  postLogoutRedirectUri: "/",
                  mainWindowRedirectUri: "/",
                })
              }
            >
              Sign Out
            </button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="nav-bar--links">
            <button
              className="nav-bar--sign-in"
              onClick={() => instance.loginPopup(loginRequest)}
            >
              Sign In
            </button>
          </div>
        </UnauthenticatedTemplate>
      </div>
    </>
  );
};
