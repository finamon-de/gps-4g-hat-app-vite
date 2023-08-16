import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ErrorPage } from '../pages/ErrorPage';
import { NamedRouteObject } from '../types/NamedRouteObject';
import { DeviceView } from '../views/DeviceView';
import { LiveMapView } from '../views/LiveMapView';
import { LoginView } from '../views/LoginView';
import { MapView } from '../views/MapView';
import { PositionView } from '../views/PositionView';
import { SignupView } from '../views/SignupView';
import { StartView } from '../views/StartView';
import { loginLoader } from './LoginLoader';
import { logoutLoader } from './LogoutLoader';
import { mainLoader } from './MainLoader';

/**
 * Child routes.
 * @returns {Array<NamedRouteObject>}
 */
export const getChildRoutes = (): Array<NamedRouteObject> => {
    return [
        {
            name: 'Start',
            path: '/',
            element: <StartView />,
        },
        {
            name: 'Devices',
            path: '/devices',
            element: <DeviceView />,
        },
        {
            name: 'Positions',
            path: '/positions',
            element: <PositionView />,
        },
        {
            name: 'History Map',
            path: '/map',
            element: <MapView />,
        },
        {
            name: 'Live Map',
            path: '/live',
            element: <LiveMapView />,
        },
        {
            name: 'Logout',
            path: '/logout',
            loader: logoutLoader,
        },
    ];
};

/**
 * Main app router.
 * @returns {Router}
 */
export const MainRouter = () => {
    return createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            loader: mainLoader,
            children: getChildRoutes(),
        },
        {
            path: '/login',
            element: <LoginView />,
            loader: loginLoader,
        },
        {
            path: '/register',
            element: <SignupView />,
        },
    ]);
};
