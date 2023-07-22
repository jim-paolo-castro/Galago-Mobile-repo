import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookAFlightPageRoutingModule } from './book-a-flight-routing.module';

import { BookAFlightPage } from './book-a-flight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookAFlightPageRoutingModule
  ],
  declarations: [BookAFlightPage]
})
export class BookAFlightPageModule {}
