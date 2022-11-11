import { ChangeEvent } from "react";
import { ITodo } from "../../types";

export interface ITodoSortPrors {
    userSortId: string, 
    onSelect: (e: ChangeEvent<HTMLSelectElement>) => void , 
    userIdArr: Set<number>
}

export interface ITodoItemProps extends ITodo{}

export interface ITodosPaginationProps {
    page: number,
    setPage: (page: number) => void, 
    sortedList: ITodo[]
}