import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/swal.service';
import { Tasks } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Tasks[] = [];
  isLoading = false;
  selectedTask: Tasks | null = null;
  taskStatusFilter: 'all' | 'pendiente' | 'completado' = 'all';

  constructor(private taskService: TaskService, private alert: AlertService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.tasks || [];
        this.isLoading = false;
      },
      error: () => {
        this.alert.error('Error al cargar las tareas');
        this.isLoading = false;
      },
    });
  }

  deleteTask(id: string): void {
    this.alert.confirm('¿Quieres eliminar esta tarea?').then((confirmed) => {
      if (!confirmed) return;

      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.alert.success('Tarea eliminada');
          this.loadTasks();
        },
        error: () => {
          this.alert.error('Error al eliminar la tarea');
        },
      });
    });
  }

  handleSave(data: Partial<Tasks>) {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, data).subscribe(() => {
        this.alert.success('Tarea actualizada');
        this.loadTasks();
      });
    } else {
      this.taskService.createTask(data).subscribe(() => {
        this.alert.success('Tarea creada');
        this.loadTasks();
      });
    }

    this.selectedTask = null;
  }

  logout(): void {
    this.alert
      .confirm('¿Estás seguro de que quieres cerrar sesión?')
      .then((confirmed) => {
        if (confirmed) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      });
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.taskStatusFilter = value as 'all' | 'pendiente' | 'completado';
  }
}
