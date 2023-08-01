import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { CartComponent } from './cart/cart.component';
import { AddingComponent } from './adding/adding.component';
import { RatingComponent } from './rating/rating.component';
import { FilterByDatePipe } from './filters/filterbydate.pipe';
import { FliterbypricePipe } from './filters/fliterbyprice.pipe';
import { FilterbyopinionPipe } from './filters/filterbyopinion.pipe';
import { FilterbynamePipe } from './filters/filterbyname.pipe';
import { StarsComponent } from './stars/stars.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    AddingComponent,
    CartComponent,
    RatingComponent,
    FilterByDatePipe,
    FliterbypricePipe,
    FilterbyopinionPipe,
    FilterbynamePipe,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
