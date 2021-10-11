import { userConstants } from '../Constants';

let name = localStorage.getItem('user');
let roles = localStorage.getItem('roles');
let user = { "name": name, "roles": roles }
const initialState = name ? { loggedIn: true, user } : {};

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
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}