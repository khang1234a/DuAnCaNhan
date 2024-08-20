import { configureStore } from '@reduxjs/toolkit'
import authSlice from './compoments/authSlice'
export const store  = configureStore({
    reducer : { auth: authSlice},
})