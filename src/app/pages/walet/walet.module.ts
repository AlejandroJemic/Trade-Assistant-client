import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaletPageRoutingModule } from './walet-routing.module';

import { WaletPage } from './walet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaletPageRoutingModule
  ],
  declarations: [WaletPage]
})
export class WaletPageModule {}
