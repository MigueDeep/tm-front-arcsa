import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from '../../models/task.model';
declare var bootstrap: any;

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
})
export class TaskFormModalComponent implements OnInit, OnChanges {
  @Input() task: Tasks | null = null;
  @Output() onSave = new EventEmitter<Partial<Tasks>>();

  taskForm!: FormGroup;
  modalTitle = 'Nueva Tarea';
  modalInstance: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.taskForm) {
      this.updateForm();
    }
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pendiente', Validators.required],
    });

    this.updateForm();
  }

  private updateForm(): void {
    if (this.task) {
      this.modalTitle = 'Editar Tarea';
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
      });
    } else {
      this.taskForm.reset();
      this.modalTitle = 'Nueva Tarea';
      this.taskForm.reset({ status: 'pendiente' });
    }
  }

  save(): void {
    if (this.taskForm.invalid) return;
    this.onSave.emit(this.taskForm.value);
    this.closeModal();
  }

  closeModal(): void {
    let btnCancel = document.getElementById('btnCancel');
    if (btnCancel) {
      btnCancel.click();
    }
  }
}
