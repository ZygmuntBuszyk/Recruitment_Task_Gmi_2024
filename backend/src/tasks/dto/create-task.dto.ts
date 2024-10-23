import { IsNotEmpty, IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsEnum(TaskStatus)
    status: TaskStatus = TaskStatus.TODO;
}