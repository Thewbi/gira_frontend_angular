import { Project } from './../../../models/project';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/* Simple component that contains no logic and just renders it's input */
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  @Input()
  projects!: Project[] | null;

  @Input()
  selectedProject!: Project | null;

  @Output()
  selectProject = new EventEmitter<Project>();

  @Output()
  editProject = new EventEmitter<Project>();

  @Output()
  deleteProject = new EventEmitter<Project>();

  constructor() {}

  ngOnInit() {}

  select(project: Project) {
    this.selectProject.emit(project);
  }

  edit(event: any, project: Project) {
    event.stopPropagation();
    this.editProject.emit(project);
  }

  delete(event: any, project: Project) {
    event.stopPropagation();
    this.deleteProject.emit(project);
  }
}
