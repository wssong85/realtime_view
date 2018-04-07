import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// TODO: 콜백처리?, create() 를 1번만 해서 쓸수는 없는건가?
@Injectable()
export class LoadingProvider {

	loading: Loading;
	
	constructor(private loadingCtrl: LoadingController) { }

	show(message: string) {

		this.loading = this.loadingCtrl.create();
		this.loading.setContent(message);
		this.loading.present();
	}

	hide() {
		this.loading.dismiss();
	}
}
