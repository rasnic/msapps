import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducer'
export default configureStore({
    reducer: {
        data: dataReducer,
      },
})