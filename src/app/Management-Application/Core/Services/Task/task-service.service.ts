import { Injectable } from '@angular/core';
import { AbstractTaskService } from '../../InterFaces/Abstraction.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { listUserInterface } from '../../InterFaces/InterFaceForLits';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService extends AbstractTaskService{
  url:string="http://localhost:3000/taskList";
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  constructor(private http:HttpClient) {
    super();
  }
  override fetchTasks(): void {
    this.http.get(this.url).subscribe((tasks:any)=>{
      this.tasksSubject.next(tasks);
    });
  }
  override addTask(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  override updateTask(taskId:number, updatedTask:Partial<listUserInterface>): Observable<any> {
    return this.http.patch(`${this.url}/${taskId}`,updatedTask);
  }
  override deleteTask(): Observable<void> {
    throw new Error('Method not implemented.');
  }

}
