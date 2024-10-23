import { CreateTaskDTO, UpdateTaskDTO, Task } from '../types/task';
import { config } from '../config/env';

const API_URL = config.apiUrl;

export const taskService = {
    async getAllTasks(): Promise<Task[]> {
        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) throw new Error('Failed to fetch tasks');

        return response.json();
    },

    async getTask(id: number): Promise<Task> {
        const response = await fetch(`${API_URL}/tasks/${id}`);

        if (!response.ok) throw new Error('Failed to fetch task');

        return response.json();
    },

    async createTask(task: CreateTaskDTO): Promise<Task> {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error('Failed to create task');

        return response.json();
    },

    async updateTask(id: number, task: UpdateTaskDTO): Promise<Task> {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error('Failed to update task');

        return response.json();
    },

    async deleteTask(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete task');
    },
};