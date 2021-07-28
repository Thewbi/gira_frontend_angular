import { Project } from './../../../models/project';
import { Task } from './../../../models/task';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output()
  addTask = new EventEmitter<Task>();

  taskFormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),]],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit(event: any): void {
    event.preventDefault();
    let task = this.taskFormGroup.value;
    task.id = -1;
    task.state = "UNKNOWN";
    // clear the form because there are exceptions, when submitting the same data twice!
    this.taskFormGroup.reset();
    // this component will emit an event about a newly created task
    this.addTask.emit(task);
  }
}
