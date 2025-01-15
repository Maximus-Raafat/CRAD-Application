import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  @Input() task: any; 
  @Output() closeDetailsEvent = new EventEmitter<void>();


  closeDetails(): void {
    this.closeDetailsEvent.emit();
  }
}
