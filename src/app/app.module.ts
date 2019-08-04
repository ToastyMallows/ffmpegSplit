import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TimeDirective } from './time.directive';

@NgModule({
  declarations: [
    AppComponent,
    TimeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TimeDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
