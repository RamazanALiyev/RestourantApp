import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth'
import products from './features/productSlice'
import tableProducts from './features/tableProduct'

export const store = configureStore({
  reducer: {
    auth,
    products,
    tableProducts
  },
})