import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A1Component } from './a1/a1.component';
import { A2Component } from './a2/a2.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { USDPKRPipe } from './_pipes/usd-pkr.pipe';
import { RedColorDirective } from './directive/red-color.directive';
@NgModule({
  declarations: [
    A1Component,
    A2Component,
    USDPKRPipe,
    RedColorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    A2Component
  ]
})
export class TestModuleModule { }