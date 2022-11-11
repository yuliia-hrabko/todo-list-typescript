import {useMemo} from "react";
import { ITodo } from './../types/index';

const useGetSortedList = (
     showOnlyCompleted: boolean,
     items: ITodo[],
     userSortId: string, 
     searchValue: string
     ) : ITodo[] => {
    return useMemo(() => {
        const searchList = items.filter(
            item => item.title.includes(searchValue));
        
        const fiteredList = !!searchValue ? searchList : items;
        
        const sortList = showOnlyCompleted ? fiteredList.filter(
            item => item.completed) : fiteredList;
    
        if(userSortId === 'all') {
            return sortList;
        }
        return sortList.filter(item => item.userId === +userSortId);
    }, [items, userSortId, showOnlyCompleted, searchValue]);
}

export default useGetSortedList;