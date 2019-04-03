import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { D3Service, DIRECTIVES } from './d3';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...DIRECTIVES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
