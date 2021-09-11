import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from 'src/app/models/project';
import { ProjectState } from 'src/app/projects/reducers';
import { selectSelectedProject } from 'src/app/projects/selectors/project-selectors';
import { TaskActionTypes } from 'src/app/tasks/actions';
import { TaskFormComponent } from 'src/app/tasks/components/task-form/task-form.component';
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

  private selectedProject: Project | null = null;

  public tasks$: Observable<Task[]> = this.store.select(selectTasks);

  public kanbanLaneStates: string[] = [
    'UNKNOWN',
    'REQUESTED',
    'INPROGRESS',
    'FINISHED',
  ];

  @ViewChild(TaskFormComponent)
  private popup?: TaskFormComponent;

  constructor(private store: Store<ProjectState>) {}

  ngOnInit() {
    // when this component draws, update the store state to contain the tasks
    // of the currently selected project to get to a consistent store state
    this.selectedProject$.subscribe((project) => {
      this.selectedProject = project;
      this.store.dispatch({
        type: TaskActionTypes.LoadTasksOfSelectedProject,
        payload: project,
      });
    });
  }

  ngAfterViewInit() {
    console.dir(this.popup);
  }

  btnPopupClicked(event: any): void {
    if (this.selectedProject != null && this.popup != null) {
      console.log('Opening PopupDialog');
      let task: Task = {
        id: -1,
        name: 'HelliCloppter',
        description: 'PoopenFeasten',
        project: this.selectedProject,

        /** Kanban state this task is in */
        state: 'UNKNOWN',
      };
      this.popup.task = task;
      this.popup.btnPopupClicked(event);
    }
  }

  addTask(task: Task) {
    console.log('addTask(): ', task);
    if (this.selectedProject == null) {
      console.log('addTask(): this.selectedProject is null!');
      return;
    }
    task.project = this.selectedProject;
    let taskAndProject = { task: task, project: this.selectedProject };
    this.store.dispatch({
      type: TaskActionTypes.AddTask,
      payload: taskAndProject,
    });
  }

  public onDeleteTask(task: Task | null) {
    // event.stopPropagation();
    console.log('KanbanboardComponent - onDeleteTask() task: ', task);
    if (task != null) {
      console.log('KanbanboardComponent - Removing task: ', task);
      // this.deleteTask.emit(task);
      let taskAndProject = { task: task, project: this.selectedProject };
      this.store.dispatch({
        type: TaskActionTypes.DeleteTask,
        payload: taskAndProject,
      });
    }
  }
}

// public deleteTask(event: any, task: Task | null) {
//   console.log('deleteTask: ', task);
// }

// public onDeleteTask(task: Task | null) {
//   // event.stopPropagation();
//   console.log('KanbanboardComponent - onDeleteTask() task: ', task);
//   if (task != null) {
//     let taskAndProject = { task: task, project: this.selectedProject };
//     this.store.dispatch({
//       type: TaskActionTypes.DeleteTask,
//       payload: taskAndProject,
//     });
//   }
// }

// /**
//  *
//  * @param event
//  */
// onDragStart(event: DragEvent) {
//   // the dataTransfer object will also be available in the drop event handler once the user drops
//   // the draggable on the drop target. This means this is the primary means to transfer the object
//   // that the user dragged from the drag start into the drop event handler.
//   //
//   // The big downside is that setData() only sets strings! The DOM element cannot be passed here!
//   // Instead the id of the draggable DOM element is put here!
//   if (event.target instanceof Element) {
//     event.dataTransfer?.setData('text', event.target.id);
//   }
// }

// /**
//  * Called when the draggable is dragged over any element including it's own old location!
//  *
//  * @param event
//  */
// onDragOver(event: DragEvent) {
//   // CALLED VERY OFTEN!
//   // otherwise, there is no drop event at all!
//   event.stopPropagation();
//   event.preventDefault();
// }

// /**
//  * Called after the user releases the mouse button and therefore releases the draggable.
//  * The draggable stops to be dragged.
//  *
//  * @param event
//  */
// onDragEnd(event: DragEvent) {}

// /**
//  * When the draggable is moved out of the drop target.
//  *
//  * @param event
//  */
// onDragLeave(event: DragEvent) {}

// /**
//  * When the draggable is dropped over the drop target.
//  *
//  * The idea is to retrieve the id of the DOM element that was dragged and perform
//  * DOM manipulation using that id.
//  *
//  * @param event
//  */
// onDrop(event: DragEvent) {
//   event.preventDefault();
//   // in the onDragStart() method, the ID of the DOM element (= the draggable's id)
//   // was put into the data for the 'text' key
//   var draggableDOMId = event.dataTransfer?.getData('text');
//   if (event.target instanceof Element) {
//     //event.target?.appendChild(document.getElementById(draggableDOMId));
//     // TODO:
//     // 1. retrieve the task, based on the id
//     // 2. retrieve the new Kanban lane that the draggable was dropped on
//     // 3. dispatch an action that will update the task state
//   }
// }

// /**
//  * When the draggable is moved over the drop target.
//  *
//  * @param event
//  */
// onDragEnter(event: DragEvent) {}
