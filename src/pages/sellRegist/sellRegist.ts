import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams} from 'ionic-angular';

import { SellPage } from '../sell/sell';
import { AlertProvider } from '../../providers/alert/alert';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//import { Camera, CameraOptions, CameraPopoverOptions} from '@ionic-native/camera';

@Component({
	selector: 'page-sellRegist',
  	templateUrl: 'sellRegist.html'
})

export class SellRegistPage {

	rootPage:any = SellPage;
	
	cash    : any = {lower: 0, upper: 1000000};
	title   : string = "아디다스 직거래 원합니다.";
	tradeSe : string = "01";
	saleSe  : string = "01";
	saleLoc : string = "신촌 현대백화점";
	hashtag : String = "";
	
	
	constructor(public navCtrl: NavController, public navParams: NavParams, 
		public http: HttpClient, public alert: AlertProvider,
		private file: File,
		private transfer: FileTransfer) {
	
		//const fileTransfer1: FileTransferObject = this.transfer.create();
		//fileTransfer.abort();
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
  	fileChange(event, formValue, id) {

		const fileTransfer: FileTransferObject = this.transfer.create();
		fileTransfer.abort();

		const headers = new HttpHeaders();
		headers.append("Content-Type", "application/json; charset=UTF-8");
		

		//console.log(event);
		console.log(event.target.files);
		console.log(id);
		console.log(formValue);
		
		let options: FileUploadOptions = {
	    	fileKey: 'file'+id,
	     	fileName: event.target.files[0].name,
	    	headers: headers
		}

		
		console.log(1);
		
		fileTransfer.upload('http://localhost/com/file/apiInsertTbFileMaster.do', 'http://localhost/com/file/apiInsertTbFileMaster.do', options)
		.then((data) => {
			console.log(3);
		}, (err) => {
			console.log(4);
		})
		console.log(2);
		
		
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
  		
  		console.log(v.split("#").join());
  		
  		this.hashtag = v.split("#").join();
  	}
  	
  	//상품목록 이동
  	sellList() {
  	
  		this.navCtrl.push(SellPage);
  		
  	}
  	
  	//상품등록
  	sellRegist(formValue : any) {
  		const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json; charset=UTF-8");
		
		this.http.post("http://localhost/shopping/product/insertSellProduct.do", formValue, { headers: headers })
		.subscribe((res: any)  => {
			
			if(res.success) {
			
				console.log("==>" + res.result);
				console.log(res.result);
			
				this.alert.showWithMessage("상품을 등록했습니다.");
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
