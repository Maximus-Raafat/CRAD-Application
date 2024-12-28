import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../../../Core/Services/Task/task-service.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit , OnChanges {
  visibleTask: boolean = false;
  formGroupAddTask!: FormGroup;
  formGroupEditTask!: FormGroup;
  status: any[] | undefined;
  selectedStatus: any | undefined;
  @Output() visibilityChange = new EventEmitter<boolean>()
  @Input() visibleEditTask: boolean = false;
  @Input() taskData : any;
  constructor(private taskService:TaskServiceService){}
  ngOnInit(): void {
    this.difineFormAddTask();
    this.status = [
      { name: 'Completed', code: 'Completed' },
      { name: 'Pending', code: 'Pending' },
    ];
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskData'] && changes['taskData'].currentValue) {
      // console.log(this.taskData)
      this.difineFormEditTask();
    } else if (!this.taskData) {
      this.formGroupEditTask = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        status: new FormControl(''),
        deadline: new FormControl(''),
      });
    }
  }

  difineFormAddTask() : void {
    this.formGroupAddTask = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      status:new FormControl(''),
      deadline: new FormControl('',[Validators.required]),      
    })
  }

  difineFormEditTask() : void {
    const defaultDeadline = "00-00-0000"
    console.log(this.taskData?.deadline)
    this.formGroupEditTask = new FormGroup({
      title:new FormControl(this.taskData?.title || null),
      description: new FormControl(this.taskData?.description || null),
      status:new FormControl(this.taskData?.status ? this.status?.find(s => s.code === this.taskData.status) : null),
      deadline: new FormControl(this.taskData?.deadline ? new Date(this.taskData.deadline) : defaultDeadline),
    })
  }
  onSubmitAdd() :void {
    const formValue = this.formateStatusDeadlibe(this.formGroupAddTask);
    this.taskService.addTask(formValue).subscribe(() => {
      console.log('Task added successfully');
    });
  }
  onSubmitEdit():void { 
    const updateData = this.formateStatusDeadlibe(this.formGroupEditTask);
    console.log("updateData",updateData)
    this.visibilityChange.emit(this.visibleEditTask);
    console.log(this.taskData.id)

    this.taskService.updateTask(this.taskData?.id, updateData).subscribe();
  }
  handleVisibility() : void{
    this.visibleTask  = false;
    this.visibleEditTask = false;
    this.visibilityChange.emit(this.visibleEditTask);
  }
  showDialog() {
      this.visibleTask = true;
  }
  formateStatusDeadlibe(formTask:any) {
    const formValue = formTask.value;
    if (formValue.deadline instanceof Date) {
      const date = formValue.deadline;
      formValue.deadline = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    if (formValue.status && formValue.status.code) {
      formValue.status = formValue.status.code;
    } else {
      console.error('Form is invalid!');
    }
    this.visibleTask  = false;
    this.visibleEditTask  = false;
    return formValue;
  }
}
