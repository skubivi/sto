import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";
import { filialApi } from "./api/filial";
import { personalApi } from "./api/personal";
import { documentsApi } from "./api/documents";
import { clientsDataApi } from "./api/clients-data";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [filialApi.reducerPath]: filialApi.reducer,
    [personalApi.reducerPath]: personalApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [clientsDataApi.reducerPath]: clientsDataApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                isSerializable: (_: unknown) => {return true}
            }
        }).concat([
            authApi.middleware,
            userApi.middleware,
            filialApi.middleware,
            personalApi.middleware,
            documentsApi.middleware,
            clientsDataApi.middleware,
        ])
})

export default store