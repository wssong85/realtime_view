import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FilterModule } from '../filter/filter.module';
import { Buy } from './buy';

@NgModule({
	declarations: [
    	Buy
  	],
  	imports: [
		IonicPageModule.forChild(Buy),
		FilterModule
  	],
  	entryComponents: [
    	Buy
	],
	providers: [
	]
})
export class BuyModule {}