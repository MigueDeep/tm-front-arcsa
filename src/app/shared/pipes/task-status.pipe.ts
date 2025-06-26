import { Pipe, PipeTransform } from '@angular/core'
import { Tasks } from 'src/app/modules/tasks/models/task.model'

@Pipe({
  name: 'taskStatus',
  standalone: false
})
export class TaskStatusPipe implements PipeTransform {
  transform(tasks: Tasks[], status: 'all' | 'pendiente' | 'completado'): Tasks[] {
    if (status === 'all') return tasks
    return tasks.filter(task => task.status === status)
  }
}
