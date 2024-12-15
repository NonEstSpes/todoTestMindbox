import React, {useEffect, useRef, useState} from "react";
import ElementTodo from "./elementTodo";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {FilterType, IItem} from "../types/type";
import {RadioButton} from "primereact/radiobutton";
import { v4 as uuidv4 } from 'uuid';


export function ListTodo() {
    let inputRef = useRef<HTMLInputElement>(null);
    const [exportItems, setExport] = useState<IItem[]>([]);
    const [filter, setFilter] = useState(FilterType.All)
    const [items, setItems] = useState<IItem[]>([]);

    useEffect(() => {
        setExport(
            items.filter((val) =>
                (filter == FilterType.All) ||
                (filter == FilterType.Completed && val.state) ||
                (filter == FilterType.Active && !val.state))
        )
    }, [filter, items]);

    const addItem = (e: React.FormEvent) => {
        const inputValue = inputRef.current?.value;
        if (inputValue) {
            const newItem: IItem = {
                value: inputValue,
                key: uuidv4(),
                state: false
            };
            setItems([...items, newItem]);
            inputRef.current!.value = "";
        }
        e.preventDefault();
    };

    const deleteCompleted = () => {
        setItems(items.filter(val => !val.state))
    };

    const setStateItem = (key: number) => {
        setItems(
            items.map((item) => {
                return key === item.key ? {...item, state: !item.state} as IItem: item
            }),
        )
    }

    return (
        <form>
            <InputText
                ref={inputRef}
                placeholder="Введите задачу"
            />
            <Button onClick={addItem}>+</Button>
            <ElementTodo
                items={exportItems}
                setStateItem={setStateItem}
            />
            <div>
                <div className="flex flex-wrap gap-3">
                    <h3>Count: {exportItems.length}</h3>
                    {Object.keys(FilterType).map((value) => {
                        const ind = uuidv4()
                        return (
                            <div key={ind} className="flex align-items-center">
                                <RadioButton
                                    inputId={ind}
                                    name="filterItem"
                                    value={value}
                                    onChange={(e) => setFilter(e.value)}
                                    checked={filter === value}
                                />
                                <label htmlFor={ind} className="ml-2">{value}</label>
                            </div>
                        )
                    })}
                </div>
                <Button onClick={deleteCompleted}>Удалить завершенные</Button>
            </div>
        </form>
    );

}