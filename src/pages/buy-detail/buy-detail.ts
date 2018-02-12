import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buy-detail',
  templateUrl: 'buy-detail.html',
})
export class BuyDetailPage {

    product:object = {};

    productPrint: string = ""; // 테스트 변수 추후 지울 것...

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        // rootParams 데이터 처리
		const params = this.navParams.data;
		if (params) {
            this.product = params.product;
            this.productPrint = JSON.stringify(this.product);
		}
    }

    goBack() {
        this.navCtrl.pop();
    }
}
