import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-kanbanitem',
  templateUrl: './kanbanitem.component.html',
  styleUrls: ['./kanbanitem.component.scss'],
})
export class KanbanitemComponent implements OnInit {
  @Input()
  public task: Task | null;

  @Output()
  selectTask = new EventEmitter<Task>();

  constructor() {
    this.task = null;
  }

  ngOnInit(): void {}

  public onSelect(task: Task) {
    this.selectTask.emit(task);
  }
}
