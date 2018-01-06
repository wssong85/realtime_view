import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Hashtag } from './hashtag';

@NgModule({
	declarations: [
    	Hashtag
  	],
  	imports: [
    	IonicPageModule.forChild(Hashtag),
  	],
  	entryComponents: [
    	Hashtag
  	]
})
export class HashtagModule {}