import { createSlice } from '@reduxjs/toolkit'
import { fetchTopping } from './Topping.action'

const fetchToppingExtraReducer = {
    [fetchTopping.pending]: (state, action) => {
        state.loading = true
    },
    [fetchTopping.fulfilled]: (state, action) => {
        state.topping = action.payload;
        state.loading = false;
    },
    [fetchTopping.rejected]: (state, action) => {
        state.loading = false
    },
}

const ToppingSlice = createSlice({
    name: 'Topping',
    initialState: {
        topping: [],
        loading: false,
    },
    reducer: {
        StoresAdded(state, action) {
            state.topping.push(action.payload)
        },
        
    },
    extraReducers: {
        ...fetchToppingExtraReducer,
        // ...addRestaurantExtraReducer,
        // ...editDoctorExtraReducer,
        // ...deleteDoctorExtraReducer,
    },
})

export const { StoresAdded } = ToppingSlice.actions

export default ToppingSlice.reducer
