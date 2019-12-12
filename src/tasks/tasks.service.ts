import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { AddTaskDto } from './dto/add-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  addTask(addTaskDto: AddTaskDto): Task {
    const { title, description } = addTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: string): Task {
    const task: Task = this.getTaskById(id);
    task.status = TaskStatus[status];
    return task;
  }

  deleteTask(id: string): Task {
    const taskToDelete = this.getTaskById(id);
    const updatedTasks = this.tasks.filter(task => task.id !== taskToDelete.id);
    this.tasks = updatedTasks;

    return taskToDelete;
  }
}
