import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SellPage } from '../sell/sell';

import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading'

@IonicPage()
@Component({
	selector: 'page-sellDetail',
  	templateUrl: 'sellDetail.html'
})
export class SellDetailPage {

	cash       : any = {lower: 0, upper: 1000000};
	tradeSe    : string = "";
	saleSe     : string = "";
	saleLoc    : string = ""; 
	title      : string = "";
	hashtag    : string = "";
	hashtagOrg : string = "";
	productSeq : String = "";
	
	
	paramProduct : object = {};

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alert: AlertProvider, public loading: LoadingProvider) {

		const params = this.navParams.data;
		
		if (params) {
			this.paramProduct = params.product;
            //this.product = params.product;
            //this.productPrint = JSON.stringify(this.product);
		}
    }
	
	//맨처음페이지들어올때
	ionViewDidLoad() {
		this.init();
	}
	
	//페이지들어올때마다
	ionViewWillEnter() {
	}
	
	ionViewDidEnter() {
	}
	
	//페이지벗어날때마다
	ionViewWillLeave() {
	}
	
	ionViewDidLeave() {
	}
	
	ionViewWillUnload() {
	}
	
	ionViewCanEnter() {
	}
	
	ionViewCanLeave() {
	}
  
  	init() {

		//판매품목 상세조회

		this.loading.show("잠시 기둘...");
		
		const headers = new HttpHeaders();
		headers.append("Content-Type", "application/json; charset=UTF-8");
		
		this.http.post("http://localhost/shopping/product/selectSellProduct.do", this.paramProduct, { headers: headers })
		.subscribe((res: any) => {
  
			const product = res.data;
			
			//데이터셋팅
			if(res.success) {
				//console.log(product);
				if (product) {
					this.productSeq = product.PRODUCT_SEQ;
					this.hashtagOrg = product.HASHTAG;
					this.saleLoc    = product.SALE_LOC;
					this.title      = product.TITLE;
					this.tradeSe    = product.TRADE_SE;
					this.saleSe     = product.SALE_SE;
					this.cash       = {lower: product.MIN_COST, upper: product.MAX_COST};
					//this.cash.lower = product.MIN_COST;
					//this.cash.upper = product.MAX_COST;
				}
			}

			this.loading.hide();

		}, (err) => {
			  
			  this.loading.hide();
			  this.alert.showWithMessage("failed loading json data");
		  });
    }

  	//해시태그변경 이벤트
  	hashtagChange(v) {
		  
		console.log(v);
		console.log(v.split("#").join());
		
		this.hashtag = v.split("#").join();
	}

  	//상품목록 이동
  	sellList() {
  	
		this.navCtrl.push(SellPage);
	}
	
	//상품수정
	sellSave(formValue : any) {

		console.log(formValue);
		const headers = new HttpHeaders();
		headers.append("Content-Type", "application/json; charset=UTF-8");
		
		this.http.post("http://localhost/shopping/product/updateSellProduct.do", formValue, { headers: headers })
		.subscribe((res: any)  => {
			
			if(res.success) {
				this.alert.showWithMessage("판매정보를 수정했습니다.");
				//this.navCtrl.push(SellPage);
				this.sellList();
			
			} else {
				this.alert.showWithMessage(res.message);
			}
			
		}, (err) => {
			this.alert.showWithMessage("failed loading json data");
		});


		
	}
}
