import { Observable } from "rxjs";

export abstract class AbstractTaskService {
    abstract fetchTasks(): void;
    abstract addTask(): Observable<any>;
    abstract updateTask(taskId:number, updatedTask:Partial<any>): Observable<any>;
    abstract deleteTask(): Observable<void>;
}