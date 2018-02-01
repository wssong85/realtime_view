import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

// TODO: 페이징처리, 클릭처리, 지도 마커 표시 처리
// TODO: 서비스 클래스 처리(?) => isFilter
@Component({
	selector: 'page-buy',
  	templateUrl: 'buy.html'
})
export class Buy {

	@ViewChild("map") mapElement: ElementRef;
	
	products: any[]  = [];
	map: any;

	loading: Loading;
	emptyMessage: string = "";
	isFilter: boolean = true; 

	constructor(private navCtrl: NavController, private navParams: NavParams, public loadingCtrl: LoadingController, private http: HttpClient, private geolocation: Geolocation) {

		// 로딩 컨트롤러 생성
		this.loading = this.loadingCtrl.create({
			content: "잠시 기둘..."
		});
		
		// rootParams 데이터 처리
		let params = this.navParams.data;
		if (params) {

			this.isFilter = params.isFilter;
			this.products = params.products;
		}
	}
	
	ionViewDidLoad() {

		console.log("buy.ts ionViewDidLoad...");

		// 로딩 화면을 보여줌
		this.loading.present();

		// 초기화 처리
		this.initMap();
		this.initList();
	}
	  
	ionViewDidEnter() {

		console.log("buy.ts ionViewDidEnter...");

		// 필터를 통해서 온 경우가 아니라면
		if (!this.isFilter) {

			// 지도 reisze 처리
			this.resetMap(this.map);
		}
	}
  	
  	initMap() {
    
    	let lat = 37.5420749968945;
    	let lng = 127.05626408827251;
    
    	this.geolocation.getCurrentPosition().then((resp) => {
 			
 			lat = resp.coords.latitude;
 			lng =  resp.coords.longitude;
 			
 			console.log("buy.ts geolocation => ", lat, lng);
 			
 			this.map.setCenter(new google.maps.LatLng(lat, lng));
 			
		}).catch((error) => {
		
  			console.log("Error getting location", error);
		});
    
    	this.map = new google.maps.Map(this.mapElement.nativeElement, {
      		zoom: 18,
      		center: {lat: lat, lng: lng}
		});
	}
	
	initList() {
	
		if (!this.isFilter && this.products.length === 0) {

			let headers = new HttpHeaders();
			headers.append("Content-Type", "application/json; charset=UTF-8");

			this.http.post("http://localhost/shopping/hastag/apitest.do", {}, { headers: headers })
			.subscribe((res: any) => {

				console.log("buy.ts initList results => %o", res);

				this.products = res.products || [];

				if (this.products.length === 0) {

					this.emptyMessage = "검색된 구매목록이 없습니다.";
				}

				this.loading.dismiss();

			}, (err) => {

				alert("failed loading json data");
				this.loading.dismiss();
			});
		} else {

			if (this.products.length === 0) {

				this.emptyMessage = "검색된 구매목록이 없습니다.";
			}

			this.loading.dismiss();
		}
	}

	resetMap(map: any) {

		let zoom = map.getZoom();
		let center = map.getCenter();

		google.maps.event.trigger(map, "resize");

		map.setZoom(zoom);
		map.setCenter(center);
	}
}

