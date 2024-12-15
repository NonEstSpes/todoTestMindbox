import { render, screen, fireEvent } from '@testing-library/react';
import { IItem } from '../types/type'; // Настройте путь, если нужно
import { act } from 'react-dom/test-utils'; // для асинхронных обновлений
import React from 'react';
import {ListTodo} from "../components/listTodo";


describe('ListTodo', () => {
    test('добавляет новый элемент', () => {
        render(<ListTodo />);
        const input = screen.getByPlaceholderText('Введите задачу');
        fireEvent.change(input, { target: { value: 'Тестовая задача' } });
        const button = screen.getByRole('button', { name: '+' });
        fireEvent.click(button);
        expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
    });

    test('правильно фильтрует элементы', async () => {
        const initialItems: IItem[] = [
            { key: 1, value: 'Задача 1', state: true },
            { key: 2, value: 'Задача 2', state: false },
            { key: 3, value: 'Задача 3', state: true },
        ];
        render(<ListTodo />);

        // Моделируем добавление элементов (вам может понадобиться вспомогательная функция здесь)
        await act(async() => {
            initialItems.forEach(item => {
                const input = screen.getByPlaceholderText('Введите задачу');
                fireEvent.change(input, { target: { value: item.value } });
                const button = screen.getByRole('button', { name: '+' });
                fireEvent.click(button);
            });
        })


        // Фильтруем по выполненным
        const completedFilter = screen.getByLabelText('Completed');
        fireEvent.click(completedFilter);
        expect(screen.getByText('Задача 1')).toBeInTheDocument();
        expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
        expect(screen.getByText('Задача 3')).toBeInTheDocument();

        // Фильтруем по активным
        const activeFilter = screen.getByLabelText('Active');
        fireEvent.click(activeFilter);
        expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
        expect(screen.getByText('Задача 2')).toBeInTheDocument();
        expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();

        // Фильтруем по всем
        const allFilter = screen.getByLabelText('All');
        fireEvent.click(allFilter);
        expect(screen.getByText('Задача 1')).toBeInTheDocument();
        expect(screen.getByText('Задача 2')).toBeInTheDocument();
        expect(screen.getByText('Задача 3')).toBeInTheDocument();
    });

    test('удаляет завершенные элементы', async () => {
        // ... (Аналогичная настройка, как выше, для добавления начальных элементов) ...
        const deleteButton = screen.getByRole('button', { name: /Удалить завершенные/i });
        fireEvent.click(deleteButton);
        expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();
        expect(screen.getByText('Задача 2')).toBeInTheDocument();
    });
});