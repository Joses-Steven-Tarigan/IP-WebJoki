import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./serviceSlice"

export default configureStore({
    reducer: {
        service: serviceReducer,
    }
})