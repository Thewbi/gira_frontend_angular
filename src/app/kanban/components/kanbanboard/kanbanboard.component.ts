import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from 'src/app/models/project';
import { ProjectState } from 'src/app/projects/reducers';
import { selectSelectedProject } from 'src/app/projects/selectors/project-selectors';
import { selectTasks } from 'src/app/tasks/selectors/task-selectors';

import { Task } from '../../../models/task';

@Component({
  selector: 'app-kanbanboard',
  templateUrl: './kanbanboard.component.html',
  styleUrls: ['./kanbanboard.component.scss'],
})
export class KanbanboardComponent implements OnInit {
  selectedProject$: Observable<Project | null> = this.store.select(
    selectSelectedProject
  );

  public tasks$: Observable<Task[]> = this.store.select(selectTasks);

  public kanbanLaneStates: string[] = [
    'UNKNOWN',
    'REQUESTED',
    'INPROGRESS',
    'FINISHED',
  ];

  constructor(private store: Store<ProjectState>) {}

  ngOnInit() {}

  /**
   *
   * @param event
   */
  onDragStart(event: DragEvent) {
    // the dataTransfer object will also be available in the drop event handler once the user drops
    // the draggable on the drop target. This means this is the primary means to transfer the object
    // that the user dragged from the drag start into the drop event handler.
    //
    // The big downside is that setData() only sets strings! The DOM element cannot be passed here!
    // Instead the id of the draggable DOM element is put here!
    if (event.target instanceof Element) {
      event.dataTransfer?.setData('text', event.target.id);
    }
  }

  /**
   * Called when the draggable is dragged over any element including it's own old location!
   *
   * @param event
   */
  onDragOver(event: DragEvent) {
    // CALLED VERY OFTEN!
    // otherwise, there is no drop event at all!
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Called after the user releases the mouse button and therefore releases the draggable.
   * The draggable stops to be dragged.
   *
   * @param event
   */
  onDragEnd(event: DragEvent) {}

  /**
   * When the draggable is moved out of the drop target.
   *
   * @param event
   */
  onDragLeave(event: DragEvent) {}

  /**
   * When the draggable is dropped over the drop target.
   *
   * The idea is to retrieve the id of the DOM element that was dragged and perform
   * DOM manipulation using that id.
   *
   * @param event
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    // in the onDragStart() method, the ID of the DOM element (= the draggable's id)
    // was put into the data for the 'text' key
    var draggableDOMId = event.dataTransfer?.getData('text');
    if (event.target instanceof Element) {
      //event.target?.appendChild(document.getElementById(draggableDOMId));
      // TODO:
      // 1. retrieve the task, based on the id
      // 2. retrieve the new Kanban lane that the draggable was dropped on
      // 3. dispatch an action that will update the task state
    }
  }

  /**
   * When the draggable is moved over the drop target.
   *
   * @param event
   */
  onDragEnter(event: DragEvent) {}
}
