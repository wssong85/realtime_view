import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SellRegist } from './sellRegist';

@NgModule({
	declarations: [
    	SellRegist,
  	],
  	imports: [
    	IonicPageModule.forChild(SellRegist),
  	],
  	entryComponents: [
    	SellRegist,
  	]
})

export class SellRegistModule {}