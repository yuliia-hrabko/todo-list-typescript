import { configureStore } from "@reduxjs/toolkit";

import todosReducer from './slices/todos';
import {todosApi }from './api/todos';

const store = configureStore ({
    reducer: {
        todos: todosReducer,

        [todosApi.reducerPath]: todosApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        todosApi.middleware)
    
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;