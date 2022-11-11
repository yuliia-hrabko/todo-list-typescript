import React, {useState, useMemo, FC, ChangeEvent} from "react";

import TodoItem from "./TodoItem";
import TodosPagination from "./TodosPagination"
import TodosSort from "./TodosSort";

import useFilterTodos from "../../hooks/useFilterTodos";
import useGetSortedList from "../../hooks/useGetSortedList";

import {useGetAllTodosQuery} from "../../store/api/todos";
import { useAppSelector } from "../../store/hooks";

import "./styles.scss";


const Todos: FC = () => {
    useGetAllTodosQuery();
    const {items} = useAppSelector(state => state.todos);
    
    const [page, setPage] = useState<number>(1);
    const [userSortId, setUserSortId] = useState('all');
    const [showOnlyCompleted, setShowOnlyCompleted] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    
    const onSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
        setUserSortId(e.target.value);
        setPage(1);
    };

    const onSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(e.target.value);
        setPage(1);
    };

    const sortedList = useGetSortedList(showOnlyCompleted, items, userSortId, searchValue);

    const filteredTodos = useFilterTodos(page, sortedList);

    const userIdArr: Set<number> = useMemo(() => new Set(items.map(t => t.userId)) ,[items]);
       
    return (
        <div className="todos">
            <div className="todos__header todos-header">
                <h1 className="todos-header__title">TODOS COUNT: {sortedList.length}</h1>
                <TodosSort {...{userSortId, onSelect, userIdArr}}/>
                <label>
                    <input type="checkbox" 
                           onChange={() => setShowOnlyCompleted(!showOnlyCompleted)} 
                           checked={showOnlyCompleted}/>
                    <span>Only completed</span>
                </label>
                <input type="search" onChange={onSearch} value={searchValue} />
            </div>
            
            <div className="todos__list">
                {
                    filteredTodos.map((todo) => <TodoItem {...todo} key= {todo.id}/>)
                }
            </div>
            {
                !filteredTodos.length && <h2 className="todos__empty">No todos</h2>
            }
            {!!filteredTodos.length && 
                <TodosPagination {...{page, setPage, sortedList}}/>}
        </div>
    );
};

export default Todos;
