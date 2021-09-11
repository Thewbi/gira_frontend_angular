import { Action } from '@ngrx/store';
import { Project } from 'src/app/models/project';
import { TaskAndProject } from 'src/app/models/TaskAndProject';
import { Task } from '../../models/task';

export enum TaskActionTypes {
  LoadAllTasks = '[Task] Load All Tasks',
  LoadAllTasksFinished = '[Task] Load All Tasks Finished',

  LoadTasksOfSelectedProject = '[Task] Load Tasks of Selected Project',
  LoadTasksOfSelectedProjectFinished = '[Task] Load Tasks of Selected Project Finished',

  AddTask = '[Task] Add Task',
  AddTaskFinished = '[Task] Add Task Finished',

  SelectTask = '[Task] Select Task',
  SelectTaskFinished = '[Task] Select Task Finished',

  DeleteTask = '[Task] Delete Task',
  DeleteTaskFinished = '[Task] Delete Task Finished',

  ClearTaskState = '[Task] Clear Task State',
  ClearTaskStateFinished = '[Task] Clear Task State Finished',

  UpdateTask = '[Task] Update Task',
  UpdateTaskFinished = '[Task] Update Task Finished',
}

export class LoadAllTasksAction implements Action {
  readonly type = TaskActionTypes.LoadAllTasks;
}

export class LoadAllTasksFinishedAction implements Action {
  readonly type = TaskActionTypes.LoadAllTasksFinished;
  constructor(public payload: Task[]) {}
}

export class LoadTasksOfSelectedProjectAction implements Action {
  readonly type = TaskActionTypes.LoadTasksOfSelectedProject;
  constructor(public payload: Project) {}
}

export class LoadTasksOfSelectedProjectFinishedAction implements Action {
  readonly type = TaskActionTypes.LoadTasksOfSelectedProject;
  constructor(public payload: Task[]) {}
}

export class AddTaskAction implements Action {
  readonly type = TaskActionTypes.AddTask;
  constructor(public payload: TaskAndProject) {}
}

export class AddTaskFinishedAction implements Action {
  readonly type = TaskActionTypes.AddTaskFinished;
  constructor(public payload: TaskAndProject) {}
}

export class SelectTaskAction implements Action {
  readonly type = TaskActionTypes.SelectTask;
  constructor(public payload: Task) {}
}

export class SelectTaskFinishedAction implements Action {
  readonly type = TaskActionTypes.SelectTaskFinished;
  constructor(public payload: Task) {}
}

export class DeleteTaskAction implements Action {
  readonly type = TaskActionTypes.DeleteTask;
  constructor(public payload: TaskAndProject) {}
}

export class DeleteTaskFinishedAction implements Action {
  readonly type = TaskActionTypes.DeleteTaskFinished;
  constructor(public payload: TaskAndProject) {}
}

export class ClearTaskStateAction implements Action {
  readonly type = TaskActionTypes.ClearTaskState;
  constructor(public payload: Project) {}
}

export class ClearTaskStateFinishedAction implements Action {
  readonly type = TaskActionTypes.ClearTaskStateFinished;
  constructor(public payload: Project) {}
}

export class UpdateTaskAction implements Action {
  readonly type = TaskActionTypes.UpdateTask;
  constructor(public payload: TaskAndProject) {}
}

export class UpdateTaskFinishedAction implements Action {
  readonly type = TaskActionTypes.UpdateTaskFinished;
  constructor(public payload: Task) {}
}

export type TaskActions =
  | LoadAllTasksAction
  | LoadAllTasksFinishedAction
  | LoadTasksOfSelectedProjectAction
  | LoadTasksOfSelectedProjectFinishedAction
  | AddTaskAction
  | AddTaskFinishedAction
  | SelectTaskAction
  | SelectTaskFinishedAction
  | DeleteTaskAction
  | DeleteTaskFinishedAction
  | ClearTaskStateAction
  | ClearTaskStateFinishedAction
  | UpdateTaskAction
  | UpdateTaskFinishedAction;
