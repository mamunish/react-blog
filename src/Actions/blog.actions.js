import { blogConstants } from "../Constants";
import { alertActions } from ".";
import { bolgPath } from "../constant";

export const blogActions = {
  add,
  getAll,
  loadMore,
  getSingle
};

/**
 * add blog post method
 * @param {*} blog 
 * @param {*} navigate 
 * @returns array of blogs
 */
function add(blog, navigate) {
  return (dispatch) => {
    dispatch(request(blog));

    fetch(bolgPath, {
      method: "POST",
      body: blog,
      headers: {
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
          navigate("/blogs", { replace: true });
        }
      })
      .catch((ex) => {
        dispatch(failure(ex.message.toString()));
        dispatch(alertActions.error(ex.message.toString()));
      });
  };

  function request(user) {
    return { type: blogConstants.ADD_REQUEST, user };
  }
  function success(user) {
    return { type: blogConstants.ADD_SUCCESS, user };
  }
  function failure(error) {
    return { type: blogConstants.ADD_FAILURE, error };
  }
}

/**
 * get all blogs
 * @param {*} skip count of skip
 * @param {*} limit count of limit
 * @returns 
 */
function getAll(skip, limit) {
  return (dispatch) => {
    dispatch(request());
    const bolgPaths = bolgPath+"?skip="+skip+"&limit="+limit;
    fetch(bolgPaths, {
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
    return { type: blogConstants.GETALL_REQUEST };
  }
  function success(blogs) {
    return { type: blogConstants.GETALL_SUCCESS, blogs };
  }
  function failure(error) {
    return { type: blogConstants.GETALL_FAILURE, error };
  }
}

/**
 * load more blogs
 * @param {*} skip count of skip
 * @param {*} limit count of limit
 * @returns 
 */
function loadMore(skip, limit) {
  return (dispatch) => {
    dispatch(request());
    const bolgPaths = bolgPath+"?skip="+skip+"&limit="+limit;
    fetch(bolgPaths, {
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
    return { type: blogConstants.LOADMORE_REQUEST };
  }
  function success(blogs) {
    return { type: blogConstants.LOADMORE_SUCCESS, blogs };
  }
  function failure(error) {
    return { type: blogConstants.LOADMORE_FAILURE, error };
  }
}

/**
 * get single blog details
 * @param {*} id blog id
 * @returns 
 */

function getSingle(id) {
  return (dispatch) => {
    dispatch(request());
    const bolgPaths = bolgPath+"/"+id;
    fetch(bolgPaths, {
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
    return { type: blogConstants.GETSINGLE_REQUEST };
  }
  function success(blog) {
    return { type: blogConstants.GETSINGLE_SUCCESS, blog };
  }
  function failure(error) {
    return { type: blogConstants.GETSINGLE_FAILURE, error };
  }
}



