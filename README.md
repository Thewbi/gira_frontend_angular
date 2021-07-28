# GiraFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



# How this app was created

## The Module for Projects

The projects module is lazy loaded via the angular router.

```
ng generate module projects
```

### Create Components

The project-container component is a smart component that uses sub-components to orchestrate
the UI for projects.

The project-container component puts the list of projects into the display
component project-list using an @Input properpty for display and selection. The project-list component
does not talk to the store. The project-list component has an EventEmitter for project deletion
and project selection to which the project-container component subscribes.

It also uses the project-form component to retrieve events about the creation of projects.
The project-form component has an EventEmitter as a @Output property to send events about newly
created projects. The project-form component does not talk to the store.

```
ng generate component projects/components/project-container
ng generate component projects/components/project-form
ng generate component projects/components/project-list
```

### The Projects Module and the NgRx Store Architecture

https://ngrx.io/guide/schematics

#### Install the schematics:

First, it is necessary to install the NgRx schematics for the angular CLI:
https://stackoverflow.com/questions/62725724/schematic-store-not-found-in-collection-schematics-angular

```
npm install @ngrx/{store,effects,entity,store-devtools} --save
ng add @ngrx/store
ng add @ngrx/schematics@latest
```

#### Install root store state to the app module

Generate the initial state management and register it within the app.module.ts

```
ng generate @ngrx/schematics:store State --root --module app.module.ts
```

To test, start the app, install Redux Development tools in your browser and look at the
raw state after visiting your page. The raw state should be an empty object.

#### install the NgRx store into a feature module

To install the NgRx store to a module, the CLI provides a schematic for adding NgRx stores to a module:

```
ng generate store <PATH_TO_MODULE_INSIDE_APP_FOLDER>/<MODULE_NAME> --module <MODULE_TS_FILE>
```

Here is an example call:

```
ng generate store projects/Projects --module projects.module.ts
```

The module was updated. Edit the project.module.ts file.

Remove the meta reducers so make the first snippet look like the last snippet.

```
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducers, { metaReducers: fromProject.metaReducers })
  ]
})
export class ProjectModule { }
```

```
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducers)
  ]
})
export class ProjectModule { }
```

In app/project/reducers/index.ts comment out the line about the environment import
and comment out the line about the meta reducers.

The only component that talks to the store is the project-container component.

#### actions

```
ng generate action projects/actions/action
```

#### effects

Installation

```
npm install @ngrx/effects --save
ng add @ngrx/effects@latest
```

Generate:

```
ng generate effect <EffectContainerName> [options]
```

Example:

```
cd src/app/projects
ng generate effect Project --group=true --module=projects

? Should we wire up success and failure actions? (y/N) y
? Do you want to use the create function? (Y/n) Y

cd ../../..
```

#### Selectors

```
ng generate selector selectorName [options]
```

Example:

```
ng generate selector allProjectsSelector
```


## The Module for Tasks

The tasks module is used by the projects module.

```
ng generate module tasks
```

### Insert NgRx Store Support to the module

To install the NgRx store to a module, the CLI provides a schematic for adding NgRx stores to a module:

```
ng generate store <PATH_TO_MODULE_INSIDE_APP_FOLDER>/<MODULE_NAME> --module <MODULE_TS_FILE>
```

Here is an example call:

```
ng generate store tasks/Tasks --module tasks.module.ts
```

### Create Components

The task-container component is a smart component that uses sub-components to orchestrate
the UI for tasks.

The task-container component puts the list of tasks into the display
component task-list using an @Input properpty for display and selection. The task-list component
does not talk to the store. The task-list component has an EventEmitter for task deletion
and task selection to which the task-container component subscribes.

It also uses the task-form component to retrieve events about the creation of tasks.
The task-form component has an EventEmitter as a @Output property to send events about newly
created tasks. The task-form component does not talk to the store.

```
ng generate component tasks/components/task-container
ng generate component tasks/components/task-form
ng generate component tasks/components/task-list
```

### Interaction with the store

The task-container component dispatches an action in it's onInit() method to load all tasks for
the currently selected project. If no project is selected, currently only the hint to select a
project is displayed to the user.

An effect will retrieve the action by subscribing to the global actions observable which represents
the stream of all actions floating through the application. Once a load tasks action arrives,
the effect uses the TasksService to retrieve all tasks via the backend
REST API. The returned tasks are then added into a new action by the effect. This new action is send
on via the effect's action observable, the global stream of actions.

The tasks reducer inserts these new incoming tasks into the store. It will replace the current array
of tasks in the store by the newly incoming list of tasks. It will not combine them in any way, just
replace them.

### Import the tasks module into the projects module.

First, make sure the TaskContainerComponent is actually exported by the tasks module.

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from './components/task-container/task-container.component';

@NgModule({
  declarations: [
    TaskContainerComponent
  ],
  imports: [CommonModule],
  exports: [TaskContainerComponent]
})
export class TasksModule {}
```

Now import the tasks module into the projects module:

```
import { TasksModule } from '../tasks/tasks.module';

...

@NgModule({
  declarations: [
    ProjectContainerComponent,
    ProjectFormComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromProjects.projectsFeatureKey,
      fromProjects.reducers
      // { metaReducers: fromProjects.metaReducers }
    ),
    EffectsModule.forFeature([ProjectsLoadAllEffectEffects]),
    TasksModule <------------------------------------------------- add the tasks module to the imports here
  ],
})
export class ProjectsModule {}
```

### Display the task-container component on the project-container component.

Into the template project-container.component.html, add the usage of the tasks component:

```
<app-task-container [selectedProject]="selectedProject$ | async"></app-task-container>
```

The task-container gets the selected project as an input from the ProjectComponent so it
knows, which project is selected currently to retrieve the tasks of that selected project only.

### Create the TaskService

```
ng generate service tasks/services/task
```

### Create Effects

One effect is needed to convert the LoadTasksOfSelectedProjectAction into a
LoadTasksOfSelectedProjectFinishedAction by calling the REST API via the TaskService.

Create the effect:

```
cd src/app/tasks
ng generate effect Task --group=true --module=tasks

? Should we wire up success and failure actions? (y/N) y
? Do you want to use the create function? (Y/n) Y

cd ../../..
```

### Create Reducers

The file src/app/tasks/reducers/index.ts was generated by ng, when NgRx store support
was added to the tasks module.

Edit src/app/tasks/reducers/index.ts

## Kanban

Kanban was developed by Toyota to create Just-In-Time production of vehicles in their factories. Factories
work as pipelines and pull in manufacturing requests for cars at one end and output cars on the other end.
If there is no request for a car, there is nothing to pull and no waste is produced.

Kanban is widely known for it's Kanban Board. The Kanban Board contains the progress of all relevant objectives.
This overview can be gained with a single glimps.

Kanban is an agile method. It is not part of Scrum however. Scrum focuses on sprints. The tickets in a sprint
are the perfect data set to put onto a Kanban Board. That way, Scrum and a Kanban Board are almost always used
in conjunction.

Having a scrum sprint defines the set of relevant tickets. The Kanban Board is a fast and easy way to
visualize a sprint.

### Kanban Module

A kanban module is created.

```
ng generate module kanban
```

The kanban module is lazy loaded, therefore a routing-module is added to the kanban module.
Create a kanban-routing.module.ts inside the kanban module:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanboardComponent } from './components/kanbanboard/kanbanboard.component';

const routes: Routes = [
  {
    path: '',
    component: KanbanboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
```

Import the kanban-routing module into the kanban module and add
it to the imports

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
```

Add a route into the app-routing.module.ts for the KanbanBoardComponent.

```
const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then((mod) => mod.ProjectsModule),
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then((mod) => mod.KanbanModule),
  },
];
```

The NgRx store is installed into the kanban module.

```
ng generate store kanban/Kanban --module kanban.module.ts
```

### Kanban Board Component

A kanban board component is created within the kanban module.
The kanban board component retrieves the tasks from the store.

```
ng generate component kanban/components/kanbanboard
```

Checking the progress: At this point, the app should be running without errors
and visting http://localhost:4200/kanban brings up the Kanbanboard component.

### Kanban Lane Component

The Kanbanlane component is used to visualize one swimlane of the Kanban board!

```
ng generate component kanban/components/kanbanlane
```

### Kanban Item Component

The Kanbanitem component is used to visualize one Task inside a Kanban lane of the  Kanban board!

```
ng generate component kanban/components/kanbanitem
```

### Routing from the project-container to the Kanbanboard

The user has two options to navigate the app.

1. Enter URLs into the browser
1. Reloading a page using the browser reload button
1. Use the links provided by the angular app

Typing URLs directly into the browser will NgRx loose the store state so will actively
reloading a page!

Angular apps are Single Page Applications where JavaScript is used to replace components
giving the "illusion" of navigating to other pages.

Angular achieves this via it's routing feature. In angular router rules, you define URLs
and the component that should be used when the URL is routed to. Then to trigger Angular's
routing feature, you use:

```
<a routerLink="/kanban" routerLinkActive="active">Kanban</a>
```

Angular will even change the URL displayed in the browser to resemble the currently displayed route.
Using routing option 3 (Angular's routing feature), even the NgRx Store will keep it's state.

### Direct Routing

When the user enters http://localhost:4200/kanban into the browser, they are not using
Angulars routing feature and the NgRx store state is lost.

When routing to the Kanbanboard, the NgRx store state is lost. The selected project
is not known in the Kanbanboard.

The state has to be transferred during routing via Angular's routing feature (see above).
If the state is not transferred, the Kanbanboard component will just display a link to the
project selection component.


## Drag and Drop

An element can be made draggable via the attribute draggable:

```
draggable="true"
```

An element can be made a drop target via: There is no special attribute.
Drop targets are elements that implement specific event handlers.

The events fired on the draggable element are:

```
(dragstart)="onDragStart($event)"
(dragover)="onDragOver($event)"
(dragend)="onDragEnd($event)"
```

The event is of type DragEvent. It has an attribute target. The target attribute
does not denote the drop target, but instead it contains the draggable.

For the draggable the order in which these events are fired, assuming that the draggable
is dragged over the drop target and then released is:

1. dragstart - once, the mouse button is pressed and hold on the draggable
2. dragover - very often, for every location change while the draggable is over the drop target
3. dragend - once, the mouse button is released

dragover is called whenever the draggable is dragged over any element, including it's own old element which
remains at the original location during dragging.

For the drop target, the events fired are:

```
(dragenter)="onDragEnter($event)"
(dragover)="onDragOver($event)"
(drop)="onDrop($event)"
(dragleave)="onDragLeave($event)"
```

For the drop target the order in which these events are fired, assuming that the draggable
is dragged over the drop target and then released is:

1. drag enter - for every time the draggable item enters the drop target
2. drag over - very often, for every location change while the draggable is over the drop target
3. drop - once the mouse button is released and the draggable "lands" on the drop target
4. drag enter - inverse operation to 'drag enter', once for every time the draggable leaves the drop target

Drop is only emitted if dragover contains:

```
event.stopPropagation();
event.preventDefault();
```

I do not know why!

The only way to transfer the draggable into the event that arrives in the drop event handler is via
the string data type. That means the element or component itself cannot be transferred. At most
the id of the component or element can be transferred.

## Testing

- when the task is deleted, which is currently selected, the store state
  should loose the selected task

- when the project is deleted, which is also currently selected, the store state
  should loose the selected project, the list of tasks, the selected task

- when the user selects another project, the selected task state is cleared



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
