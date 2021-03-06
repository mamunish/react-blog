import { userConstants } from "../Constants";

/**
 * user reducer
 * @param {*} state initial value
 * @param {*} action user actions
 * @returns action and states
 */
export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        items: action.users.users,
        loading: false,
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
