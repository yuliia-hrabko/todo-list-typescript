import React, { FC } from "react";
import { ITodoSortPrors } from "./types";

const TodosSort: FC<ITodoSortPrors> = ({ userSortId, onSelect, userIdArr }) => {
    return (
        <select value={userSortId} onChange={onSelect}>
            <option value="all">All</option>
            {[...userIdArr].map((id) => (
                <option key={id} value={id}>userId: {id}</option>
            ))}
        </select>
    );
};

export default TodosSort;
