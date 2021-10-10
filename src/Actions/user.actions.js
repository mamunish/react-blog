import { userConstants } from "../Constants";
import { alertActions } from ".";
import { loginPath, registerPath } from "../constant";

export const userActions = {
  login,
  logout,
  register
};

/**
 * login the user
 * @param {*} data login information (email, password)
 * @param {*} navigate redirect the after login
 * @returns 
 */
function login(data, navigate) {
  return (dispatch) => {
    dispatch(request(data));

    fetch(loginPath, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.statusCode === 500) {
          dispatch(failure(res.message));
          dispatch(alertActions.error(res.message));
        } else {
          dispatch(success(res.body));
          dispatch(alertActions.success(res.message));
          localStorage.setItem("access_token", res.body.token);
          navigate("/", { replace: true });
        }
      })
      .catch((ex) => {
        dispatch(failure(ex.message.toString()));
        dispatch(alertActions.error(ex.message.toString()));
      });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

/**
 * logout the user 
 * @returns 
 */

function logout() {
  return { type: userConstants.LOGOUT };
}

/**
 * register the user
 * @param {*} user register user information
 * @param {*} navigate redirect the next
 * @returns 
 */
function register(user, navigate) {
  return (dispatch) => {
    dispatch(request(user));

    fetch(registerPath, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.statusCode === 500) {
          dispatch(failure(res.message));
          dispatch(alertActions.error(res.message));
        } else {
          dispatch(success(res.body));
          navigate("/login", { replace: true });
        }
      })
      .catch((ex) => {
        dispatch(failure(ex.message.toString()));
        dispatch(alertActions.error(ex.message.toString()));
      });
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}