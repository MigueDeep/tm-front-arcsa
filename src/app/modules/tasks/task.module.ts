import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskFormModalComponent } from './components/task-form.modal/task-form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStatusPipe } from 'src/app/shared/pipes/task-status.pipe';

@NgModule({
    declarations: [
        TaskListComponent,
        TaskFormModalComponent,
        TaskStatusPipe
    ],
    imports: [ 
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [],
})
export class TaskModule {}