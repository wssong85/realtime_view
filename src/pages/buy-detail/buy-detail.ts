import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buy-detail',
  templateUrl: 'buy-detail.html',
})
export class BuyDetailPage {

    product:object = {};

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {

		console.log("buy-detail.ts ionViewDidLoad...");

        // rootParams 데이터 처리
        const params = this.navParams.data;
        if (params) {
            this.product = params.product;
        }

        console.log(this.product);
	}

    goBack() {
        this.navCtrl.pop();
    }
}
