import { NgModule } from '@angular/core';
import { HashtagToArrayPipe } from './hashtag-to-array/hashtag-to-array';

@NgModule({
	declarations: [HashtagToArrayPipe],
	imports: [],
	exports: [HashtagToArrayPipe]
})
export class PipesModule {}
