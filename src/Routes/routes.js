import { Navigate } from "react-router-dom";
import { LoggedOutLayout, LoggedInLayout } from "../Layouts";
import { NotFound, Login, Register, Home, Blogs, NewBlog, BlogDetail, Users } from "../Pages";

/* ---------------------------- build the routes ---------------------------- */

const routes = (isLoggedIn, roles) => {
    return [
        {
            path: '/add-blog',
            element: isLoggedIn && roles === 'user' ? <LoggedInLayout /> : <Navigate to="/login" replace />,
            children: [
                { path: '/add-blog', element: <NewBlog  /> },
            ]
        },
        {
            path: '/',
            element: <LoggedInLayout />,
            children: [
                { path: '/', element: <Home  /> },
                { path: '/blogs', element: <Blogs  /> },
                { path: '/blog/:id', element: <BlogDetail  /> },
                { path: '/users', element: isLoggedIn && roles === 'admin' ? <Users  /> : <Navigate to="/login" replace /> },
            ]
        },
        {
            path: '/',
            element: !isLoggedIn ? <LoggedOutLayout /> : <Navigate to="/" replace />,
            children: [
                { path: 'login', element: <Login sideBarText="Hi, Welcome Back!" /> },
                { path: 'register', element: <Register sideBarText="Register" /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/login" /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },

        { path: '*', element: <Navigate to="/404" replace /> }
    ]
};

export default routes;
