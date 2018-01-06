import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Detail } from './detail';

@NgModule({
	declarations: [
    	Detail,
  	],
  	imports: [
    	IonicPageModule.forChild(Detail),
  	],
  	entryComponents: [
    	Detail,
  	]
})

export class DetailModule {}