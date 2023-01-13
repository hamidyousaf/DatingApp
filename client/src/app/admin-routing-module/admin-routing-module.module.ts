import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModuleRoutingModule } from './admin-routing-module-routing.module';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';


@NgModule({
  declarations: [
    LoginComponent,
    ListsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModuleRoutingModule
  ],
  exports:[
    LoginComponent,
    ListsComponent
  ]
})
export class AdminRoutingModuleModule { }
