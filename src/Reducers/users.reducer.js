import { userConstants } from '../Constants';

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
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}