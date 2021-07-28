import { Action } from '@ngrx/store';
import { Project } from '../../models/project'

export enum ProjectActionTypes {
  LoadAllProjects = '[Project] Load Projects',
  LoadAllProjectsFinished = '[Project] Load Projects Finished',

  LoadSingleProject = '[Project] Load Single Project',
  LoadSingleProjectFinished = '[Project] Load Single Project Finished',

  AddProject = '[Project] Add Project',
  AddProjectFinished = '[Project] Add Project Finished',

  DeleteProject = '[Project] Delete Project',
  DeleteProjectFinished = '[Project] Delete Project Finished',

  SelectProject = '[Project] Select Project',
  SelectProjectFinished = '[Project] Select Project Finished',
}

export class LoadAllProjectsAction implements Action {
  readonly type = ProjectActionTypes.LoadAllProjects;
}

export class LoadAllProjectsFinishedAction implements Action {
  readonly type = ProjectActionTypes.LoadAllProjectsFinished;
  constructor(public payload: Project[]) {}
}

export class LoadSingleProjectAction implements Action {
  readonly type = ProjectActionTypes.LoadSingleProject;
  constructor(public payload: string) {}
}

export class LoadSingleProjectFinishedAction implements Action {
  readonly type = ProjectActionTypes.LoadSingleProjectFinished;
  constructor(public payload: Project) {}
}

export class AddProjectAction implements Action {
  readonly type = ProjectActionTypes.AddProject;
  constructor(public payload: Project) {}
}

export class AddProjectFinishedAction implements Action {
  readonly type = ProjectActionTypes.AddProjectFinished;
  constructor(public payload: Project) {}
}

export class DeleteProjectAction implements Action {
  readonly type = ProjectActionTypes.DeleteProject;
  constructor(public payload: Project) {}
}

export class DeleteProjectFinishedAction implements Action {
  readonly type = ProjectActionTypes.DeleteProjectFinished;
  constructor(public payload: Project) {}
}

export class SelectProjectAction implements Action {
  readonly type = ProjectActionTypes.SelectProject;
  constructor(public payload: Project) {}
}

export class SelectProjectFinishedAction implements Action {
  readonly type = ProjectActionTypes.SelectProjectFinished;
  constructor(public payload: Project) {}
}

export type ProjectActions =
  | AddProjectAction
  | AddProjectFinishedAction
  | LoadAllProjectsAction
  | LoadAllProjectsFinishedAction
  | LoadSingleProjectAction
  | LoadSingleProjectFinishedAction
  | DeleteProjectAction
  | DeleteProjectFinishedAction
  | SelectProjectAction
  | SelectProjectFinishedAction;