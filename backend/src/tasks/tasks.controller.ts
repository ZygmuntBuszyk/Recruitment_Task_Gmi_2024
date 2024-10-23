import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @ApiOperation({ summary: 'Create task' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Task created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
    @UsePipes(new ValidationPipe())
    async create(@Body() createTaskDto: CreateTaskDto) {
        try {
            return await this.tasksService.create(createTaskDto);
        } catch (error) {
            throw new BadRequestException('Failed to create task');
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all tasks' })
    async findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by id' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return the task' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found' })
    async findOne(@Param('id') id: string) {
        const task = await this.tasksService.findOne(+id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update task' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Task updated successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found' })
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        try {
            return await this.tasksService.update(+id, updateTaskDto);
        } catch (error) {
            throw new BadRequestException('Failed to update task');
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete task' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Task deleted successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found' })
    async remove(@Param('id') id: string) {
        try {
            return await this.tasksService.remove(+id);
        } catch (error) {
            throw new BadRequestException('Failed to delete task');
        }
    }
}