import { Action } from '@ngrx/store';
import { Task } from '../../models/task'

export enum KanbanActionTypes {
  // LoadAllProjects = '[Project] Load Projects',
  // LoadAllProjectsFinished = '[Project] Load Projects Finished',

  // LoadSingleProject = '[Project] Load Single Project',
  // LoadSingleProjectFinished = '[Project] Load Single Project Finished',

  // AddProject = '[Project] Add Project',
  // AddProjectFinished = '[Project] Add Project Finished',

  // DeleteProject = '[Project] Delete Project',
  // DeleteProjectFinished = '[Project] Delete Project Finished',

  SelectTask = '[Kanban] Select Task',
  SelectTaskFinished = '[Kanban] Select Task Finished',
}

// export class LoadAllProjectsAction implements Action {
//   readonly type = ProjectActionTypes.LoadAllProjects;
// }

// export class LoadAllProjectsFinishedAction implements Action {
//   readonly type = ProjectActionTypes.LoadAllProjectsFinished;
//   constructor(public payload: Project[]) {}
// }

// export class LoadSingleProjectAction implements Action {
//   readonly type = ProjectActionTypes.LoadSingleProject;
//   constructor(public payload: string) {}
// }

// export class LoadSingleProjectFinishedAction implements Action {
//   readonly type = ProjectActionTypes.LoadSingleProjectFinished;
//   constructor(public payload: Project) {}
// }

// export class AddProjectAction implements Action {
//   readonly type = ProjectActionTypes.AddProject;
//   constructor(public payload: Project) {}
// }

// export class AddProjectFinishedAction implements Action {
//   readonly type = ProjectActionTypes.AddProjectFinished;
//   constructor(public payload: Project) {}
// }

// export class DeleteProjectAction implements Action {
//   readonly type = ProjectActionTypes.DeleteProject;
//   constructor(public payload: Project) {}
// }

// export class DeleteProjectFinishedAction implements Action {
//   readonly type = ProjectActionTypes.DeleteProjectFinished;
//   constructor(public payload: Project) {}
// }

export class SelectTaskAction implements Action {
  readonly type = KanbanActionTypes.SelectTask;
  constructor(public payload: Task) {}
}

export class SelectTaskFinishedAction implements Action {
  readonly type = KanbanActionTypes.SelectTaskFinished;
  constructor(public payload: Task) {}
}

export type ProjectActions =
  // | AddProjectAction
  // | AddProjectFinishedAction
  // | LoadAllProjectsAction
  // | LoadAllProjectsFinishedAction
  // | LoadSingleProjectAction
  // | LoadSingleProjectFinishedAction
  // | DeleteProjectAction
  // | DeleteProjectFinishedAction
  | SelectTaskAction
  | SelectTaskFinishedAction;