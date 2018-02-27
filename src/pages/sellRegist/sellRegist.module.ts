import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SellRegistPage } from './sellRegist';

@NgModule({
	declarations: [
    	SellRegistPage,
  	],
  	imports: [
    	IonicPageModule.forChild(SellRegistPage),
  	]
})
export class SellRegistPageModule {}