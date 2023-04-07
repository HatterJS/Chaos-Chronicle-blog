import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FacebookLogin from "../FacebookLogin";

import { fetchUserData, isAuthCheck } from "../../redux/slices/authorization";

import { closeSVG } from "../SvgSprite";

import "./index.css";

function AuthorizationForm({ isShowForm, setIsShowForm }) {
  //create dispatch for redux
  const dispatch = useDispatch();
  //get user data from redux
  const isAuthorized = useSelector(isAuthCheck);
  //create state for email and password
  const [authData, setAuthData] = React.useState({
    email: "",
    password: "",
  });
  //send authorization data and get user data from backend
  async function sendAuthData() {
    const data = await dispatch(fetchUserData(authData));
    if (data.payload) {
      localStorage.setItem("token", data.payload.token);
      setAuthData({
        email: "",
        password: "",
      });
    } else {
      alert(data.error.message);
    }
  }
  //catch Enter on last input field
  function handleLastInputKey(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendAuthData();
    }
  }
  //check user data
  function userDataValidation() {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(authData.email)) {
      return "Перевірте email";
    }
    return "Вхід";
  }
  React.useEffect(() => {
    isAuthorized && setIsShowForm(false);
  }, [isAuthorized, setIsShowForm]);
  return (
    <div
      className={
        isShowForm
          ? "authorizationForm show unselectable"
          : "authorizationForm hint"
      }
    >
      <div
        className="authorizationForm__shadow"
        onClick={() => setIsShowForm(false)}
      ></div>
      <div className="authorizationForm__form">
        <div
          className="authorizationForm__close"
          onClick={() => setIsShowForm(false)}
        >
          {closeSVG}
        </div>
        <div className="authorizationForm__header">
          <h2>Авторизація</h2>
        </div>
        <div className="authorizationForm__body">
          <div className="authorizationForm__inputField">
            <input
              type="email"
              placeholder=" "
              value={authData.email}
              onChange={(event) =>
                setAuthData((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <div>E-mail</div>
          </div>
          <div className="authorizationForm__inputField">
            <input
              type="password"
              placeholder=" "
              value={authData.password}
              onChange={(event) =>
                setAuthData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              onKeyUp={handleLastInputKey}
            />
            <div>Password</div>
          </div>
          <div className="authorizationForm__buttons">
            <button
              className="acceptButton"
              onClick={sendAuthData}
              disabled={userDataValidation() !== "Вхід"}
            >
              {userDataValidation()}
            </button>
          </div>
          <div className="authorizationForm__registration">
            <p>Відсутній акаунт?</p>
            <Link to="/registration" onClick={() => setIsShowForm(false)}>
              Реєстрація.
            </Link>
          </div>
          <FacebookLogin />
        </div>
      </div>
    </div>
  );
}

export default AuthorizationForm;
