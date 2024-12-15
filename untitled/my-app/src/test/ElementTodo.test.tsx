import { render, screen, fireEvent } from '@testing-library/react';
import { IItem } from '../types/type';
import ElementTodo from "../components/elementTodo";
import React from 'react';

describe('ElementTodo', () => {
    test('рендерит элементы корректно', () => {
        const items: IItem[] = [
            { key: 1, value: 'Элемент 1', state: true },
            { key: 2, value: 'Элемент 2', state: false },
        ];
        const mockSetStateItem = jest.fn(); // Мокаем функцию

        render(<ElementTodo items={items} setStateItem={mockSetStateItem} />);

        expect(screen.getByText('Элемент 1')).toBeInTheDocument();
        expect(screen.getByText('Элемент 2')).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument(); // Проверяем состояние чекбокса
        expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument();
    });
    test('вызывает setStateItem при клике на чекбокс', () => {
        const items: IItem[] = [{ key: 1, value: 'Элемент 1', state: false }];
        const mockSetStateItem = jest.fn();
        render(<ElementTodo items={items} setStateItem={mockSetStateItem} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(mockSetStateItem).toHaveBeenCalledWith(1);
    });
});