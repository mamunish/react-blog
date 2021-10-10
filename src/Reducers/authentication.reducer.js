import { userConstants } from '../Constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

/**
 * authentication reducer
 * @param {*} state initial value
 * @param {*} action user actions
 * @returns action and states
 */
export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}