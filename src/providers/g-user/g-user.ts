import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GUserProvider {

    user: object = {};

    constructor() {}

    set(user: object) {
        this.user = user;
    }

    get(key: string = ""): string {
        return (key) ? this.user[key] : this.user;
    }

    print() {
        console.log(this.user);
    }
}
