import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../../Core/Services/Task/task-service.service';
import { listUserInterface } from '../../../Core/InterFaces/InterFaceForLits';
interface Status {
  name: string;
  code: string;
}
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  listItems: listUserInterface[] = [];
  filteredItems: listUserInterface[] = [];
  checked: boolean = false;
  status:Status[] | undefined;
  selectedStatus:Status | undefined;
  
  constructor(private taskService:TaskServiceService){
   
  }
  ngOnInit(): void {
    this.taskService.fetchTasks()
    this.taskService.tasks$.subscribe((item) => {
      this.listItems = item;
      this.filteredItems = [...this.listItems];
    });
    
    this.status = [
      { name: 'All', code: 'All' },
      { name: 'Completed', code: 'Completed' },
      { name: 'Pending', code: 'Pending' },

    ];
  }
  toggleTaskStutus(task:listUserInterface) : void {
    const updateStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    const updatedTask = {...task, status:updateStatus};

    this.taskService.updateTask(task.id,{status:updateStatus}).subscribe(()=>{
      task.status = updateStatus;
      console.log(`Task ${task.id} updated to status: ${updateStatus}`);

    })
    

  }
  filterTask(statusCode:string) : void {
    if (statusCode === "All") {
      this.filteredItems = [...this.listItems];
    } else {
      this.filteredItems = this.listItems.filter(
        (task) => task.status === statusCode
      )
    }
  }
}
