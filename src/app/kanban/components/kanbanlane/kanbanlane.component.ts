import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TaskState } from 'src/app/tasks/reducers';
import { TaskActionTypes } from 'src/app/tasks/actions';
import { Task } from '../../../models/task';
import { selectTaskByStateFactorySelector } from '../../selectors/kanban-selectors';
import { TaskAndProject } from 'src/app/models/TaskAndProject';

@Component({
  selector: 'app-kanbanlane',
  templateUrl: './kanbanlane.component.html',
  styleUrls: ['./kanbanlane.component.scss'],
})
export class KanbanlaneComponent implements OnInit {
  /** The state, this Kanbanlane represents. It will contain all Kanbanitems having this state. */
  @Input()
  public taskState: string = 'UNKNOWN';
  public tasks$: Observable<Task[]> | null = null;
  constructor(private store: Store<any>) {}
  ngOnInit(): void {
    this.tasks$ = this.store.select(
      selectTaskByStateFactorySelector(this.taskState)
    );
  }
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
   * When the draggable is moved over the drop target.
   *
   * @param event
   */
  onDragEnter(event: DragEvent) {}
  /**
   * Called when the draggable is dragged over any element including it's own old location!
   *
   * @param event
   */
  onDragOver(event: DragEvent) {
    // otherwise, there is no drop event at all!
    event.stopPropagation();
    event.preventDefault();
    // CALLED VERY OFTEN!
  }
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
    // event.target is actually the kanban lane that the item was dragged into
    // in the onDragStart() method, the ID of the DOM element (= the draggable's id)
    // was put into the data for the 'text' key
    var draggableDOMId = event.dataTransfer?.getData('text');
    if (event.target instanceof Element) {
      const taskIdSplit = draggableDOMId?.split('_');
      let taskId: number = -1;
      if (taskIdSplit) {
        taskId = +taskIdSplit[1];
      }
      if (taskId) {
        this.store.pipe(take(1)).subscribe((state) => {
          let taskSlice: TaskState = state.tasks_slice;
          let task = taskSlice.tasks.find((task) => task.id === taskId);

          if (task) {
            let tempTask = { ...task, state: this.taskState};
            let taskAndProject: TaskAndProject = {
              project: tempTask.project,
              task: tempTask,
            };

            this.store.dispatch({
              type: TaskActionTypes.UpdateTask,
              payload: taskAndProject,
            });
          }
        });
      }
    }
  }
}
