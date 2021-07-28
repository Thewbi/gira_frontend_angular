import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Project } from 'src/app/models/project';
import { TaskActions, TaskActionTypes } from '../actions';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions<TaskActions>,
    private taskService: TaskService
  ) {}

  loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.LoadAllTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => {
            return tasks;
          }),
          map((tasks) => ({
            type: TaskActionTypes.LoadAllTasksFinished,
            payload: tasks,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c
  loadAllTasksOfSelectedProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.LoadTasksOfSelectedProject),
      mergeMap((action) =>
        this.taskService.getTasksByProject(action.payload as Project).pipe(
          map((tasks) => {
            return tasks;
          }),
          map((tasks) => ({
            type: TaskActionTypes.LoadTasksOfSelectedProjectFinished,
            payload: tasks,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.AddTask),
      mergeMap((action) => {
        return this.taskService
          .addTask(action.payload.project, action.payload.task)
          .pipe(
            map((task) => {
              task.project = action.payload.project;
              let taskAndProject = { ...action.payload, task };
              return {
                type: TaskActionTypes.AddTaskFinished,
                payload: taskAndProject,
              };
            }),
            catchError(() => EMPTY)
          );
      })
    )
  );

  deleteTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.DeleteTask),
      mergeMap(({ payload }) =>
        this.taskService.deleteTask(payload).pipe(
          map((task) => ({
            type: TaskActionTypes.DeleteTaskFinished,
            payload: payload,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.UpdateTask),
      mergeMap(({ payload }) => {
        return this.taskService.updateTask(payload.project, payload.task).pipe(
          map((taskAndProject) => {
            let result = taskAndProject;
            result.project = payload.project;
            return {
              type: TaskActionTypes.UpdateTaskFinished,
              payload: result,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
