import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ChildsComponent } from './components/childs/childs.component';
import {HomeComponent} from './components/home/home.component'
import {AppRoutingModule} from './app-routing.module'
@NgModule({
  declarations: [
    AppComponent,
    ChildsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
