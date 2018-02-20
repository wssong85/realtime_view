import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HashtagToArrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
	name: 'hashtagToArray',
})
export class HashtagToArrayPipe implements PipeTransform {

	/**
	 * Takes a value and makes it lowercase.
	 */
	transform(value: string, ...args) {

		let result = [];

		if (value && value.trim().length !== 0) {
			result = value.split(",");	
		}
		
		return result
	}
}
