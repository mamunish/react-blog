import { blogConstants } from "../Constants";

/**
 * blogs reducer
 * @param {*} state initial value
 * @param {*} action user actions
 * @returns action and states
 */
export function blogs(state = {}, action) {
  switch (action.type) {
    case blogConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.blogs.blogs,
        count: action.blogs.count,
        loading: false,
      };
    case blogConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case blogConstants.LOADMORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogConstants.LOADMORE_SUCCESS:
      const newList = action.blogs.blogs;
      const { items } = state;
      return {
        ...state,
        items: items.concat(newList),
        count: action.blogs.count,
        loading: false,
      };
    case blogConstants.LOADMORE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

/**
 * single blog reducer
 * @param {*} state initial value
 * @param {*} action user actions
 * @returns action and states
 */
export function blog(state = {}, action) {
  switch (action.type) {
    case blogConstants.GETSINGLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogConstants.GETSINGLE_SUCCESS:
      return {
        ...state,
        items: action.blog.blog[0],
        likes: action.blog.blog[0].like ? action.blog.blog[0].like.length : 0,
        unlikes: action.blog.blog[0].unlike
          ? action.blog.blog[0].unlike.length
          : 0,
        loading: false,
      };
    case blogConstants.GETSINGLE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case blogConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case blogConstants.UPDATE_SUCCESS:
      return {
        ...state,
        items: action.blog.blog[0],
        likes: action.blog.blog[0].like ? action.blog.blog[0].like.length : 0,
        unlikes: action.blog.blog[0].unlike
          ? action.blog.blog[0].unlike.length
          : 0,
        loading: false,
      };
    case blogConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
