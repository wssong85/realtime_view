import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, NavParams, Platform } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { SellPage } from '../sell/sell';
import { MapSearchPage } from '../map-search/map-search'

import { AlertProvider } from '../../providers/alert/alert';

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
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
		public http: HttpClient, public alert: AlertProvider, public platform: Platform,
		private file: File, private transfer: FileTransfer, private camera: Camera) {
	
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
  	fileChange(event: any, formValue: object, id: string) {

        const files = event.target.files;
        const fileToUpload = files[0];

        const formData = new FormData();
        formData.append("file", fileToUpload, fileToUpload.name);
        formData.append("id", id);

        // 차라리 서버에서 json parse하는게 나을듯?
        // 안할경우 cash 처리 필요
        for (const key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                const value = formValue[key];
                formData.append(key, value);
            }
        }

        this.http.post("http://localhost/com/file/apiInsertTbFileMaster.do", formData)
        .subscribe((res: any) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });

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
  		let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json; charset=UTF-8");
		
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
      
    searchGo() {

        let modal = this.modalCtrl.create(MapSearchPage);

        modal.onDidDismiss(data => {
            console.log("sellRegist.ts data = %o", data);
            this.saleLoc = data.location;
        });

        modal.present();
    }
}
