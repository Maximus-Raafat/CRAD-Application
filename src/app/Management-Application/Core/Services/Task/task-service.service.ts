import { Injectable } from '@angular/core';
import { AbstractTaskService } from '../../InterFaces/Abstraction.service';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
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
  override addTask(task:listUserInterface): Observable<any> {
    // get the current data task
    const currentTasks = this.tasksSubject.getValue();
    const nextId = currentTasks.length > 0 ? Math.max(...currentTasks.map((t)=> t.id)) + 1 : 1;
    const newTask = {...task, id:nextId.toString()};
    return this.http.post(`${this.url}`,newTask).pipe(
      tap((addedTask:any) => {
        this.tasksSubject.next([...currentTasks, addedTask]);
      })
    );
  }
  override updateTask(taskId:number, updatedTask:Partial<listUserInterface>): Observable<any> {
    const currentTasks = this.tasksSubject.getValue();
    const taskIndex = currentTasks.findIndex(task => task.id === taskId);
  
    if (taskIndex === -1) {
      console.error("Task not found:", taskId);
      return throwError(() => new Error("Task not found"));
    }
  
    const updatedTasks = [...currentTasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...updatedTask };
  
    this.tasksSubject.next(updatedTasks);
  
    return this.http.patch(`${this.url}/${taskId}`, updatedTask)
  }
  override deleteTask(): Observable<void> {
    throw new Error('Method not implemented.');
  }

}
