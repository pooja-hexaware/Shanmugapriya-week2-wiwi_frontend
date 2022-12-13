import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const endPoint = 'Cart'

export const fetch = createAsyncThunk('Cart/fetchCart', async () => {
    const response = await axios.get('http://localhost:4000/cart');
    const Cart = await response.data
    return Cart;
})

