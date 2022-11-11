import {useMemo} from "react";
import { ITodo } from './../types/index';

const useFilterTodos = (page: number, sortedList: ITodo[]): ITodo[] => {
    return useMemo(() => {
        const start = (page - 1) * 20;
        const end = start + 20;
        return sortedList.slice(start, end);
    }, [page, sortedList]);
};

export default useFilterTodos;