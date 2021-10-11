import { commentConstants } from "../Constants";

/**
 * comments reducer
 * @param {*} state initial value
 * @param {*} action user actions
 * @returns action and states
 */
export function comments(state = {}, action) {
  switch (action.type) {
    case commentConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentConstants.ADD_SUCCESS:
      return {
        ...state,
        items: action.comments.comments,
        count: action.comments.count,
        loading: false,
      };
    case commentConstants.ADD_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case commentConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.comments.comments,
        count: action.comments.count,
        loading: false,
      };
    case commentConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
