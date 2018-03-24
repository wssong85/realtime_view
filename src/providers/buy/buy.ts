import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the BuyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuyProvider {

    filter: object = {};
    zone: object = {};

    constructor(public http: Http) {
        console.log('Hello BuyProvider Provider');
        console.log("call?");
    }
}
