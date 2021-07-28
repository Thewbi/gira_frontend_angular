import { ActionReducerMap } from '@ngrx/store';
import { Project } from 'src/app/models/project';
import { projectsReducer, selectedProjectsReducer } from './projects-reducer';

/*
 * This value is used in projects.module.ts and adds a slice to the global store state
 * for this feature module. The slice/property in the global store state uses
 * projectsFeatureKey's value as a name.
 */
export const projectsFeatureKey = 'projects_slice';

export interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
}

export const initialProjectState: ProjectState = {
  projects: [],
  selectedProject: null,
};

export const reducers: ActionReducerMap<ProjectState> = {
  projects: projectsReducer,
  selectedProject: selectedProjectsReducer,
};
