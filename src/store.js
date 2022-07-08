import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth'
import products from './features/productSlice'

export const store = configureStore({
  reducer: {
    auth,
    products
  },
})