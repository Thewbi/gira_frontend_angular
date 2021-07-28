import { ProjectActionTypes, AddProjectAction } from '../actions/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  loadAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.LoadAllProjects),
      mergeMap(() =>
        this.projectService.getProjects().pipe(
          map((projects) => ({
            type: ProjectActionTypes.LoadAllProjectsFinished,
            payload: projects,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.AddProject),
      mergeMap(({payload}) =>
        this.projectService.addProject(payload).pipe(
          map((project) => ({
            type: ProjectActionTypes.AddProjectFinished,
            payload: project,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.DeleteProject),
      mergeMap(({payload}) =>
        this.projectService.deleteProject(payload).pipe(
          map((project) => ({
            type: ProjectActionTypes.DeleteProjectFinished,
            payload: payload,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
