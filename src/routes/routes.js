import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import NoNavbar from '../layouts/noNavbar/noNavbar';
import NoLayout from '../layouts/noLayout/noLayout';
import Admin from '../pages/Admin/admin';
import Users from '../pages/Users/users';
import Service from '../pages/Service/service';
import Booking from '../pages/Booking/booking';

const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).roleId === '0';
};

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/service', component: Service },
    { path: '/booking', component: Booking },
    { path: '/login', component: Login, layout: NoLayout },
    { path: '/user-information', component: Users, layout: NoNavbar },
];

const privateRoutes = [
    {
        path: '/admin',
        component: isAuthenticated() ? Admin : Login,
        layout: NoNavbar,
    },
];

export { publicRoutes, privateRoutes, isAuthenticated };
