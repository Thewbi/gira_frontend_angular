import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from 'src/app/models/project';
import { TaskActionTypes } from 'src/app/tasks/actions';
import { ProjectActionTypes } from '../../actions';
import { ProjectState } from '../../reducers';
import {
  selectAllProjects,
  selectSelectedProject,
} from '../../selectors/project-selectors';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss'],
})
export class ProjectContainerComponent implements OnInit {
  // Two things to consider:
  // 1. when the state did not change, the memoized value can be returned without wasting CPU on computing that memoized value again
  // memoization is a feature of selectors
  // 2. Even with memoization, the same memoized value can be returned several times and the UI will update with the same
  // value. To prevent returning the same value over and over, store.select() is used. It will not return a value
  // if that value was returned prior. The UI will not constantly update.
  projects$: Observable<Project[]> = this.store.select(selectAllProjects);

  selectedProject$: Observable<Project | null> = this.store.select(
    selectSelectedProject
  );

  private selectedProject: Project | null;

  constructor(private store: Store<ProjectState>, private router: Router) {
    this.selectedProject = null;
  }

  ngOnInit() {
    this.store.dispatch({ type: ProjectActionTypes.LoadAllProjects });

    this.selectedProject$.subscribe((selectedProject) => {
      this.selectedProject = selectedProject;
    });
  }

  addProject(project: Project) {
    this.store.dispatch({
      type: ProjectActionTypes.AddProject,
      payload: project,
    });
  }

  deleteProject(project: Project) {
    if (confirm('Are you sure to delete ' + project.projectname) == false) {
      return;
    }
    // clear the task slice if the deleted project is currently selected
    if (this.selectedProject?.id == project.id) {
      this.store.dispatch({
        type: TaskActionTypes.ClearTaskState,
        payload: project,
      });
    }
    // delete from the project slice
    this.store.dispatch({
      type: ProjectActionTypes.DeleteProject,
      payload: project,
    });
  }

  selectProject(project: Project) {
    if (this.selectedProject?.id != project.id) {
      this.store.dispatch({
        type: TaskActionTypes.ClearTaskState,
        payload: project,
      });
    }
    this.store.dispatch({
      type: ProjectActionTypes.SelectProject,
      payload: project,
    });
    // navigate to this project's kanban board
    this.router.navigate(['/kanban']);
  }
}
