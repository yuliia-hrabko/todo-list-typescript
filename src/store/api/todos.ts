import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ITodo } from '../../types';
import baseQuery from './baseQuery';

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery, 
    endpoints: (builder) => ({
        getAllTodos: builder.query <ITodo[], void> ({
            query: () => 'todos',
        })
    })
});

export const {useGetAllTodosQuery} = todosApi;