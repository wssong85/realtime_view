import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { SellPage } from '../sell/sell';

@Component({
	selector: 'page-sellRegist',
  	templateUrl: 'sellRegist.html'
})

export class SellRegistPage {

	rootPage:any = SellPage;
	
	cash: any = {lower: 0, upper: 1000000};
	title   : string = "아디다스 직거래 원합니다.";
	tradeSe : string = "01";
	saleSe  : string = "01";
	saleLoc : string = "신촌 현대백화점";
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
	
	}
	
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
  
  	//onLoad
  	init() {
  		//console.log("regist");
  	}
  	
  	//파일변경 이벤트
  	fileChange($event) {
		console.log($event.target.files);
		
		//TODO 파일 확장자 검사
	    //if ($event.target.files.length > 0) {
	    //	var reader = new FileReader();
		//	var that = this;
		//	reader.onload = (loadEvent:any) => {
	    //    	that.dataUrl.push(loadEvent.target.result);
		//	}
	    // 	reader.readAsDataURL($event.target.files[0]);
	    //}
  	}
  	
  	//해시태그변경 이벤트
  	hashtagChange(v) {
  		console.log(v);
  	}
  	
  	//상품목록 이동
  	sellList(formValue : any) {
  	
  		this.navCtrl.push(SellPage);
  		
  	}
  	
  	//상품등록
  	sellRegist(formValue : any) {
  		const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        
		console.log(formValue);
		
		this.http.post("http://localhost/shopping/product/insertSellProduct.do", formValue, { headers: headers })
		.subscribe((res: any)  => {
			
			if(res.success) {
			
				console.log("==>" + res.result);
				console.log(res.result);
			
				this.showAlert("상품을 등록했습니다.");
				//this.navCtrl.push(SellPage);
				this.sellList();
				
			
			} else {
				this.showAlert(res.message);
			}
			
		}, (err) => {
			this.showAlert("failed loading json data");
		});
  	}
  	
  	showAlert(message: any, goPage: any) {
		 let alert = this.alertCtrl.create({
	  	 	title: "알림",
	  	 	subTitle: message,
	  	 	buttons: ["확인"]
		 });
		alert.present();
  	}
}
