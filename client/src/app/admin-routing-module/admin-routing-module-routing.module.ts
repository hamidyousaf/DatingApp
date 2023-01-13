import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from '../lists/lists.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "loginss", component: LoginComponent},
  {path: "listss", component: ListsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModuleRoutingModule { }
