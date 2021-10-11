import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './routes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    const isLoggedIn = localStorage.getItem('access_token');
    const roles = localStorage.getItem('roles');
    return useRoutes(MainRoutes(isLoggedIn, roles));
}