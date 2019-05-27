import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListService } from './list.service';
import { ListEditComponent } from './list-edit/list-edit.component';
import { ListStartComponent } from './list-start/list-start.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { DataService } from './data.service';
import { MinDateDirective } from './min-date.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    ListEditComponent,
    ListStartComponent,
    ItemsComponent,
    ItemDetailsComponent,
    MinDateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ListService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
