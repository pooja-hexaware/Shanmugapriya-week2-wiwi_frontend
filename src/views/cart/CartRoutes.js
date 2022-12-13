import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const Cart = Loadable(lazy(() => import('./addToCart')))

const CartRoutes = [
    {
        path: '/cart',
        element: <Cart />,
    },
  
]

export default CartRoutes
