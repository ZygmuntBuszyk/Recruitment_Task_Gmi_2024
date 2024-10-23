import { TaskStatus } from '../dto/create-task.dto';

export class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}