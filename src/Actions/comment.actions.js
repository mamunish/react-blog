import { commentConstants } from "../Constants";
import { alertActions } from ".";
import { commentPath } from "../constant";

export const commentActions = {
  add,
  getAll
};

/**
 * add comment post method
 * @param {*} comment 
 * @returns array of comments
 */
function add(comment) {
  return (dispatch) => {
    dispatch(request());

    fetch(commentPath, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.statusCode === 500) {
          dispatch(failure(res.message));
          dispatch(alertActions.error(res.message));
        } else {
          dispatch(success(res.body));
          dispatch(alertActions.success(res.message));
        }
      })
      .catch((ex) => {
        dispatch(failure(ex.message.toString()));
        dispatch(alertActions.error(ex.message.toString()));
      });
  };

  function request(comment) {
    return { type: commentConstants.ADD_REQUEST, comment };
  }
  function success(comments) {
    return { type: commentConstants.ADD_SUCCESS, comments };
  }
  function failure(error) {
    return { type: commentConstants.ADD_FAILURE, error };
  }
}

/**
 * get all comments
 * @param {*} skip count of skip
 * @param {*} limit count of limit
 * @returns 
 */
function getAll(blog) {
  return (dispatch) => {
    dispatch(request());
    const commentPaths = commentPath+"/"+blog;
    fetch(commentPaths, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.statusCode === 500) {
          dispatch(failure(res.message));
          dispatch(alertActions.error(res.message));
        } else {
          dispatch(success(res.body));
        }
      })
      .catch((ex) => {
        dispatch(failure(ex.message.toString()));
        dispatch(alertActions.error(ex.message.toString()));
      });
  };

  function request() {
    return { type: commentConstants.GETALL_REQUEST };
  }
  function success(comments) {
    return { type: commentConstants.GETALL_SUCCESS, comments };
  }
  function failure(error) {
    return { type: commentConstants.GETALL_FAILURE, error };
  }
}




