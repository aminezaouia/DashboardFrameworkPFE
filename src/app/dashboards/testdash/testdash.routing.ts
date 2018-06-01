import { Routes, RouterModule } from '@angular/router';
import {TestdashComponent} from "./testdash.component";
import {ModuleWithProviders} from "@angular/core";
import { NgModule } from '@angular/core';
const routes: Routes = [{
    path: '',
    component: TestdashComponent,
    data: {pageTitle: 'testdash'}
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
  })
export  class TestdashRouting {}
