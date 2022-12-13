import NotFound from 'views/sessions/NotFound'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
import RestaurantRoutes from 'views/restaurant/RestaurantRoutes'
import MenuRoutes from 'views/menu/MenuRoutes'
import CartRoutes from 'views/cart/CartRoutes'

export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [...homeRoutes, ...RestaurantRoutes, ...MenuRoutes, ...CartRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
