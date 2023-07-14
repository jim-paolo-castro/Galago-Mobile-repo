import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferredClassPageRoutingModule } from './preferred-class-routing.module';

import { PreferredClassPage } from './preferred-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferredClassPageRoutingModule
  ],
  declarations: [PreferredClassPage]
})
export class PreferredClassPageModule {}
