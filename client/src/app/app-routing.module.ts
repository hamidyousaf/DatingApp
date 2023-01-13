import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComapnyComponent } from './about-comapny/about-comapny.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { GroupRoutingModuleComponent } from './group-routing-module/group-routing-module.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { A1Component } from './test-module/a1/a1.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
      {path: 'members/:username', component: MemberDetailComponent}, //Dynamic Routing
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorComponent, },
  {path: 'not-found', component: NotFoundComponent, },
  {path: 'server-error', component: ServerErrorComponent, },
  
  // {path:"home", component: A1Component},
  // {path:"about", component: A1Component},
  // {path:"contact-us", component: A1Component}
  {
    path: 'about',  //it will be shows like  https://localhost:4200/about/about-me and https://localhost:4200/about/about-company (this is also called group routing)
    component: AboutComponent,
    children:[
      {path: "about-me", component: AboutMeComponent},
      {path: "about-company", component: AboutComapnyComponent},
    ]
  },
  {path:"group-routing", component: GroupRoutingModuleComponent},
  {path:"**" , component: NotFoundComponent, pathMatch: "full"}, //path:"**" mean if the route is not correct than it redirect to HomeComponent or Not Found Page and it should be at the end of all routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
