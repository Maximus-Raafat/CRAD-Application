import { Observable } from "rxjs";
import { listUserInterface } from "./InterFaceForLits";

export abstract class AbstractTaskService {
    abstract fetchTasks(): void;
    abstract addTask(task:listUserInterface): Observable<any>;
    abstract updateTask(taskId:number, updatedTask:Partial<any>): Observable<any>;
    abstract deleteTask(taskId:any): Observable<void>;
}