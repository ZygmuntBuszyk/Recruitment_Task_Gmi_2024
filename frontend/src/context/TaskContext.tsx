import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task';
import { taskService } from '../services/api';

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (task: CreateTaskDTO) => Promise<void>;
    updateTask: (id: number, task: UpdateTaskDTO) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            setError(null);
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
        }
    }, []);

    const createTask = useCallback(async (taskData: CreateTaskDTO) => {
        const tempTask: Task = {
            id: Date.now(), // Temporary ID
            ...taskData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setTasks(prevTasks => [tempTask, ...prevTasks]);

        try {
            const newTask = await taskService.createTask(taskData);

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === tempTask.id ? newTask : task
                )
            );
        } catch (err) {
            setTasks(prevTasks =>
                prevTasks.filter(task => task.id !== tempTask.id)
            );
            throw err;
        }
    }, []);

    const updateTask = useCallback(async (id: number, taskData: UpdateTaskDTO) => {
        const originalTask = tasks.find(t => t.id === id);
        if (!originalTask) return;

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id
                    ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
                    : task
            )
        );

        try {
            const updatedTask = await taskService.updateTask(id, taskData);

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? updatedTask : task
                )
            );
        } catch (err) {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? originalTask : task
                )
            );
            throw err;
        }
    }, [tasks]);

    const deleteTask = useCallback(async (id: number) => {
        const deletedTask = tasks.find(t => t.id === id);
        if (!deletedTask) return;

        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

        try {
            await taskService.deleteTask(id);
        } catch (err) {
            if (deletedTask) {
                setTasks(prevTasks => [...prevTasks, deletedTask]);
            }
            throw err;
        }
    }, [tasks]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                fetchTasks,
                createTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('wtf');
    }
    return context;
}