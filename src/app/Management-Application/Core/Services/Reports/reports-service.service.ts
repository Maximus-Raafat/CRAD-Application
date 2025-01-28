import { Injectable } from '@angular/core';
import { TaskServiceService } from '../Task/task-service.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsServiceService {

  constructor(private taskService:TaskServiceService) { }
  getTaskCounts(): Observable<{ completed: number; pending: number }> {
    return this.taskService.tasks$.pipe(
      map(tasks => {
        const completed = tasks.filter((task:any) =>task.status === "Completed").length;
        const pending  = tasks.filter((task:any) =>task.status === "Pending").length;
        return {completed,pending}
      })
    )
  }
}
