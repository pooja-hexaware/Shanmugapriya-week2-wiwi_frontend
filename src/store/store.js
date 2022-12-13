import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
import RestaurantReducer from '../views/restaurant/store/RestaurantSlice'
import MenuReducer from '../views/menu/store/MenuSlice'
import ToppingReducer from '../views/topping/store/ToppingSlice'
import cartReducer from '../views/cart/store/CartSlice'

export default configureStore({
    reducer: {
        Restaurant: RestaurantReducer,
        Menu: MenuReducer,
        Topping: ToppingReducer,
        Cart: cartReducer
    },
})
