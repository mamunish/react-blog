import { userConstants } from '../Constants';

/**
 * user registration reducer
 * @param {*} state initial value
 * @param {*} action user actions
 * @returns action and states
 */
export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}