import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SellPage } from '../sell/sell';

import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

import { gAjaxProvider } from '../../providers/comm/gAjaxProvider';

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
	imgSrc1    : String = "";
	imgSrc2    : String = "";
	imgSrc3    : String = "";
	
	paramProduct : object = {};

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alert: AlertProvider, public loading: LoadingProvider, public gAjax: gAjaxProvider) {

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

		//공통ajax 변수셋팅
		let param = { "url" : "http://localhost/shopping/product/apiSelectSellProduct.do"
					, "param" : this.paramProduct
					, "ajaxType" : 1
					, "USER_ID" : "admin"
					, "USER_PW" : 1234
		};

		const result = this.gAjax.gFnAjax(param);

		console.log(result);
		
		// let returnMap = this.gAjax.gFnAjax("/shopping/product/apiSelectSellProduct.do", this.paramProduct);
		// console.log(returnMap);



		// this.http.post("http://localhost/shopping/product/apiSelectSellProduct.do", this.paramProduct, { headers: headers })
		// .subscribe((res: any) => {
  
		// 	const product = res.data.product;
		// 	const file = res.data.file;

		// 	//데이터셋팅
		// 	if(res.success) {
		// 		//console.log(product);
		// 		if (product) {
		// 			this.productSeq = product.PRODUCT_SEQ;
		// 			this.hashtagOrg = product.HASHTAG;
		// 			this.saleLoc    = product.SALE_LOC;
		// 			this.title      = product.TITLE;
		// 			this.tradeSe    = product.TRADE_SE;
		// 			this.saleSe     = product.SALE_SE;
		// 			this.cash       = {lower: product.MIN_COST, upper: product.MAX_COST};
		// 			//this.cash.lower = product.MIN_COST;
		// 			//this.cash.upper = product.MAX_COST;
		// 		}
		// 		if (file) {
		// 			for (let i in file) {
		// 				let item = file[i];
		// 				let imgSrc = "http://localhost/com/file/apiSelectTbFileDetail.do?FILE_ID=" + item.FILE_ID
		// 						   + "&FILE_DETAIL_ID=" + item.FILE_DETAIL_ID
		// 						   + "&FILE_SEQ=" + item.FILE_SEQ;
		// 				if (item.FILE_SEQ==1) {
		// 					this.imgSrc1 = imgSrc;
		// 				} else if (item.FILE_SEQ==2) {
		// 					this.imgSrc2 = imgSrc;
		// 				} else if (item.FILE_SEQ==3) {
		// 					this.imgSrc3 = imgSrc;
		// 				}
		// 			}
		// 		}
		// 	}

		// 	this.loading.hide();

		// }, (err) => {
			  
		// 	  this.loading.hide();
		// 	  this.alert.showWithMessage("failed loading json data");
		//   });
    }

  	//해시태그변경 이벤트
  	hashtagChange(v) {
		  
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
		
		this.http.post("http://localhost/shopping/product/apiUpdateSellProduct.do", formValue, { headers: headers })
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
