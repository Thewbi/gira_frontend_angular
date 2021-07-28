import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private url: string = 'http://localhost:8080/projects';

  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url + '/all');
  }

  addProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.url + '/create', project);
  }

  deleteProject(project: Project): Observable<Project> {
    return this.httpClient.delete<Project>(this.url + '/delete/' + project.id);
  }
}
