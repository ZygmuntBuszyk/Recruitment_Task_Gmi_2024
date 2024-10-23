import { Task } from '../types/task';

export type RootStackParamList = {
    TaskList: undefined;
    TaskDetail: { id: number };
    TaskForm: { task?: Task };
};