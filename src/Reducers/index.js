import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { blogs, blog } from './blogs.reducer';
import { comments } from './comment.reducer';

const rootReducer = combineReducers({
    form: reduxFormReducer,
    authentication,
    registration,
    users,
    alert,
    blogs,
    blog,
    comments
});

export default rootReducer;