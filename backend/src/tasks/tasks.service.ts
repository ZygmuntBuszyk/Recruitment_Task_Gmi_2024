import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async create(createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }

    async findAll() {
        return this.prisma.task.findMany();
    }

    async findOne(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task;
    }


    async update(id: number, updateTaskDto: UpdateTaskDto) {
        try {
            return await this.prisma.task.update({
                where: { id },
                data: {
                    ...updateTaskDto,
                    updatedAt: new Date(),
                },
            });
        } catch (error) {
            if (error?.code === 'P2025') {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.task.delete({
                where: { id },
            });
        } catch (error) {
            if (error?.code === 'P2025') {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            throw error;
        }
    }
}