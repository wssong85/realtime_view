import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

import { AlertProvider } from '../../providers/alert/alert'
import { LoadingProvider } from '../../providers/loading/loading'

import { SellDetailPage } from '../sellDetail/sellDetail';

@Component({
	selector: 'page-sell',
  	templateUrl: 'sell.html'
})
export class SellPage {

    static readonly LINE_SIZE: number = 2;
    page: number = 0; // 일단은 limit으로 처리하기 때문에 0부터 시작
    param: object = {};

	hoverIdx: number = -1;

	products: any[]  = [];
	emptyMessage: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alert: AlertProvider, public loading: LoadingProvider) {}
    
    ionViewDidLoad() {

		console.log("buy.ts ionViewDidLoad...");

		// 초기화 처리
		this.initList(false);
    }

    // 초기 목록 가져오기
	initList(isMore: boolean) {

		this.loading.show("잠시 기둘...");
	
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json; charset=UTF-8");

        this.param["page"] = this.page * SellPage.LINE_SIZE;
        this.param["lineSize"] = SellPage.LINE_SIZE;

        this.http.post("http://localhost/shopping/hastag/apiSelectBuyProduct.do", this.param, { headers: headers })
        .subscribe((res: any) => {

            console.log("sell.ts initList results => %o", res);

            if (res.products.length === 0) {

                if (isMore) {
                    this.alert.showWithMessage("더이상 없엉..");

                } else {
                    this.emptyMessage = "검색된 구매목록이 없습니다.";	
                    this.page = 0;
                }
			} else {

				// 기존 목록과 합침
                this.products = this.products.concat(res.products);
                this.page += 1;
            }
            
            this.loading.hide();

        }, (err) => {

            this.loading.hide();
            this.alert.showWithMessage("failed loading json data");
        });
    }
	
    // 상세보기
    detailGo(id: number) {

        const product = this.products.find(obj => { return obj.PRODUCT_SEQ === id });
        this.navCtrl.push(SellDetailPage, {product: product});
    }

    // 목록 마우스 오버
    itemEnter(idx: number) {
        this.hoverIdx = idx;
    }

    // 목록 마우스 아웃
    itemLeave(idx: number) {
        this.hoverIdx = -1;
    }    
}
