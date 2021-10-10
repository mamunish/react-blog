
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../src/Reducers';

/* -------------------------------------------------------------------------- */
/*                                  Create the store function                                 */
/* -------------------------------------------------------------------------- */
const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);