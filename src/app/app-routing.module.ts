import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormBuilderModule} from "./shared/modules/form-builder/form-builder.module";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormBuilderModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
