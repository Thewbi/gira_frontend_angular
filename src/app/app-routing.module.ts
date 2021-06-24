import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: 'projects', component: ProjectFormComponent },
  { path: 'users', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}


