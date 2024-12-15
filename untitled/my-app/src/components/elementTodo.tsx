import React from "react";
import {IItem} from "../types/type";
import {Checkbox} from "primereact/checkbox";

export default function ElementTodo(
    { items, setStateItem }: {
        items: IItem[];
        setStateItem: (id: number) => void
    }
) {
    return (
        <ul>
            {items.map((el) => (
                <li key={el.key}>
                    <Checkbox
                        checked={el.state}
                        onClick={() => setStateItem(el.key)}
                        key={el.key}
                    />
                    {el.value}
                </li>
            ))}
        </ul>
    );
}
