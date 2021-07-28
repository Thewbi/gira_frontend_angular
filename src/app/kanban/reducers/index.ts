import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Task } from '../../models/task';
import { selectedTaskReducer } from './kanban-reducer';

export const kanbanFeatureKey = 'kanban_slice';

export interface KanbanState {
  // taskStateMap: Map<string, Task[]>;
  selectedTask: Task | null;
}

export const initialKanbanState: KanbanState = {
  // taskStateMap: new Map<string, Task[]>(),
  selectedTask: null
};

export const reducers: ActionReducerMap<KanbanState> = {
  // taskStateMap: ,
  selectedTask: selectedTaskReducer,
};


export const metaReducers: MetaReducer<KanbanState>[] = !environment.production ? [] : [];
