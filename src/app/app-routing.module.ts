import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerComponent } from './timer/timer.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {path:'timer', component: TimerComponent},
  {path: '', redirectTo: 'todos', pathMatch: 'full'},
  {path:'todos', component: TodosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
