import { Action } from '@ngrx/store';
import { Project } from '../../models/project';
import {
  AddProjectFinishedAction,
  DeleteProjectFinishedAction,
  LoadAllProjectsFinishedAction,
  ProjectActionTypes,
  SelectProjectAction,
} from '../actions';

export function selectedProjectsReducer(
  state: Project | null = null,
  action: Action
): Project | null {
  switch (action.type) {
    case ProjectActionTypes.SelectProject: {
      let selectedProject = (action as SelectProjectAction).payload;
      return selectedProject;
    }
    case ProjectActionTypes.DeleteProjectFinished: {
      let deletedProject = (action as DeleteProjectFinishedAction).payload;
      if (state?.id == deletedProject.id) {
        return null;
      }
      return state;
    }
    default:
      return state;
  }
}

export function projectsReducer(
  state: Project[] = [],
  action: Action
): Project[] {
  switch (action.type) {
    case ProjectActionTypes.AddProjectFinished: {
      // works with a single array
      return [...state, (action as AddProjectFinishedAction).payload];
    }
    case ProjectActionTypes.LoadAllProjectsFinished: {
      return [...(action as LoadAllProjectsFinishedAction).payload];
    }
    case ProjectActionTypes.LoadSingleProjectFinished: {
      return [...state];
    }
    case ProjectActionTypes.DeleteProjectFinished: {
      let deletedProject = (action as DeleteProjectFinishedAction).payload;
      return state.filter((p) => p.id !== deletedProject.id);
    }

    default:
      return [...state];
  }
}
