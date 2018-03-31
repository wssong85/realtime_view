import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, NavParams, Platform, Checkbox, RadioButton } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { SellPage } from '../sell/sell';
import { MapSearchPage } from '../map-search/map-search';

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
	hashtag : string = "";
	saleLoc : string = "신촌 현대백화점";
	saleCordinate : string = "";

	chk1 : boolean = false;
	chk2 : boolean = false;
	chk3 : boolean = false;

	fileId : string = "";          //파일마스터아이디
	delegateFileId : string = "";  //파일대표아이디
	fileDetailId1  : string = "";  //파일디테일아이디
	fileDetailId2  : string = "";  //파일디테일아이디
	fileDetailId3  : string = "";  //파일디테일아이디

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
  	}

  	//파일변경 이벤트
  	fileChange(event: any, id: string) {

		console.log(event.target);
        const files = event.target.files;
        const fileToUpload = files[0];

		let fileArr = fileToUpload.name.split(".");

        const formData = new FormData();
        formData.append("file", fileToUpload, fileArr[0] + "_" + id + "." + fileArr[1]);  //파일아이디 셋팅
		formData.append("id", id);
		formData.append("PROCESS_SE", this.fileId=="" ? "C" : "U");  //파일컨트롤러 처리구분값 - C(새로입력), U(입력된 후 다시 입력)

		if (this.fileId!="") {
			formData.append("FILE_ID", this.fileId);                    //파일마스터아이디
			if (id=="1") {
				formData.append("FILE_DETAIL_ID", this.fileDetailId1);  //파일디테일아이디
			} else if (id=="2") {
				formData.append("FILE_DETAIL_ID", this.fileDetailId2);  //파일디테일아이디
			} else if (id=="3") {
				formData.append("FILE_DETAIL_ID", this.fileDetailId3);  //파일디테일아이디
			}
		}

        this.http.post("http://localhost/com/file/apiInsertTbFileMaster.do", formData)
        .subscribe((res: any) => {

			console.log(res.result[0]);

			this.fileId       = res.result[0].FILE_ID;
			//파일디테일아이디는 각자 file 태그마다 가지고 있어야함.
			if (id=="1") {
				this.fileDetailId1 = res.result[0].FILE_DETAIL_ID;
			} else if (id=="2") {
				this.fileDetailId2 = res.result[0].FILE_DETAIL_ID;
			} else if (id=="3") {
				this.fileDetailId3 = res.result[0].FILE_DETAIL_ID;
			}

			if (id=="1") {
				this.chk1 = true;
				this.chk2 = false;
				this.chk3 = false;
				this.delegateFileId = res.result[0].FILE_DETAIL_ID;
			} else if (id=="2") {
				this.chk1 = false;
				this.chk2 = true;
				this.chk3 = false;
				this.delegateFileId = res.result[0].FILE_DETAIL_ID;
			} else if (id=="3") {
				this.chk1 = false;
				this.chk2 = false;
				this.chk3 = true;
				this.delegateFileId = res.result[0].FILE_DETAIL_ID;
			}

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

  	//대표사진선택 이벤트
  	radioChange(obj: any, id: string) {
		console.log(obj);
  	}

  	//해시태그변경 이벤트
  	hashtagChange(v) {
  		
  		this.hashtag = v.split("#").join();
  	}
  	
  	//상품목록 이동
  	sellList() {
  	
  		this.navCtrl.push(SellPage);
  		
  	}
  	
  	//상품등록
  	sellRegist(formValue : any) {

		console.log(formValue);
		return;
  		let headers = new HttpHeaders();
		headers = headers.append("Content-Type", "application/json; charset=UTF-8");
		  
		console.log(formValue);

		formValue.fileId         = this.fileId;          //파일마스터아이디
		formValue.delegateFileId = this.delegateFileId;  //파일대표아이디
		
		this.http.post("http://localhost/shopping/product/insertSellProduct.do", formValue, { headers: headers })
		.subscribe((res: any)  => {
			
			if(res.success) {
			
				console.log("==>" + res.result);
			
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
            this.saleLoc = data.location;
            this.saleCordinate = data.coordinate;
		});
		
        modal.present();
    }
}
