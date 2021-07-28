import { createSelector } from '@ngrx/store';
import { projectsFeatureKey, ProjectState } from '../reducers';

// Selector for projects from the project feature slice

// first, select the feature slice from the global store state
export const selectProjectState = (state: any) => state[projectsFeatureKey];

// second, select the relevant property from the feature module's slice
export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => {
    return state.projects;
  }
);

// second, select the relevant property from the feature module's slice
export const selectSelectedProject = createSelector(
  selectProjectState,
  (state: ProjectState) => {
    if (state) {
      return state.selectedProject;
    }
    return null;
  }
);
