import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {todosApi }from '../api/todos'
import { ITodoSlice } from "./type";

const initialState: ITodoSlice = {
    items: []
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        removeTodo: (state, {payload}: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !==payload);
        },
        changeStatus: (state, {payload}: PayloadAction<number>) => {
            state.items = state.items.map(item => {
                if(item.id === payload) {
                    item.completed = !item.completed;
                }
                return item;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            todosApi.endpoints.getAllTodos.matchFulfilled,
            (state, {payload}) => {
                state.items = payload;
            }
        )
    }
});

export const {removeTodo, changeStatus} = todosSlice.actions;

export default todosSlice.reducer;