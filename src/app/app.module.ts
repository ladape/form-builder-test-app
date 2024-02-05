import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormBuilderModule} from "./shared/modules/form-builder/form-builder.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormBuilderModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
