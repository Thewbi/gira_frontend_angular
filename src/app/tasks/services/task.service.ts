import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models/project';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url + '/all');
  }

  getTasksByProject(project: Project): Observable<Task[]> {
    if (project == null) {
      return EMPTY;
    }

    return this.httpClient
      .get<Task[]>(this.url + '/all?projectId=' + project.id)
      .pipe(
        map((tasks) => {
          tasks.forEach((task) => (task.project = project));
          return tasks;
        })
      );
  }

  addTask(project: Project, task: Task): Observable<Task> {
    return this.httpClient.post<Task>(
      this.url + '/create?projectId=' + project.id,
      task
    );
  }

  updateTask(project: Project, task: Task): Observable<Task> {
    if (project == null) {
      throw 'project is null';
    }
    return this.httpClient.post<Task>(
      this.url + '/update?projectId=' + project.id,
      task
    );
  }

  deleteTask(task: Task): Observable<Task> {
    console.log('Task: ', task);
    return this.httpClient.delete<Task>(this.url + '/delete/' + task.id);
  }
}
