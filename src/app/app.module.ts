import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HeaderComponent,
    TodoFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
