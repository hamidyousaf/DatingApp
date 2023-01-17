import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TestModuleModule} from './test-module/test-module.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component'
import { FormsModule } from '@angular/forms'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import {ToastrModule} from 'ngx-toastr';
import { SharedModule } from './_module/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { TestComponent } from './test/test.component';
import { InlineStyleComponent } from './test/inline-style/inline-style.component';
import { InlineTemplateComponent } from './test/inline-template/inline-template.component';
import { InlineStyleInlineTemplateComponent } from './test/inline-style-inline-template/inline-style-inline-template.component';
import { RedColorDirective } from './test-module_directive/red-color.directive';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutComponent } from './about/about.component';
import { AboutComapnyComponent } from './about-comapny/about-comapny.component';
import { AdminRoutingModuleModule } from './admin-routing-module/admin-routing-module.module';
import { GroupRoutingModuleComponent } from './group-routing-module/group-routing-module.component';
import { RxJsComponent } from './rx-js/rx-js.component';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    TestComponent,
    InlineStyleComponent,
    InlineTemplateComponent,
    InlineStyleInlineTemplateComponent,
    RedColorDirective,
    AboutMeComponent,
    AboutComponent,
    AboutComapnyComponent,
    GroupRoutingModuleComponent,
    RxJsComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    TestModuleModule,
    AdminRoutingModuleModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
