import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { AlertProvider } from '../../providers/alert/alert'
import { LoadingProvider } from '../../providers/loading/loading'

import { BuyDetailPage } from '../buy-detail/buy-detail'

declare var google;

// TODO: 마커 위치로 이동 처리? => 그러면 클릭은 언제?, 마커 순서 확인 필요
// TODO: 서비스 클래스 처리(?) => filters
// TODO: 목록 가져오기 하나로 합치기
// TODO: 반경 검색 
// TODO: 반경 검색 + 필터 검색
@IonicPage()
@Component({
	selector: 'page-buy',
	  templateUrl: 'buy.html'
})
export class BuyPage {

	@ViewChild("map") mapElement: ElementRef;

	static readonly LINE_SIZE: number = 2;
	page: number = 0; // 일단은 limit으로 처리하기 때문에 0부터 시작

	hoverIdx: number = -1;

	products: any[]  = [];
	emptyMessage: string = "";
    filters: object = {}; 
    points: any = {};

	map: any;
	markers: any[] = [];
	curPos: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, 
		public geolocation: Geolocation, public alert: AlertProvider, public loading: LoadingProvider) {

		// rootParams 데이터 처리
		const params = this.navParams.data;
		if (params) {
			this.filters = params.filters;
            this.products = params.products;
            this.points = params.points;
        }
	}
	
	ionViewDidLoad() {

		console.log("buy.ts ionViewDidLoad...");

		// 초기화 처리
		this.initMap();
		this.initList();
	}
	  
	ionViewDidEnter() {

		console.log("buy.ts ionViewDidEnter...");

		// 장소나 필터를 통해서 온 경우가 아니라면
		if (Object.keys(this.points).length !== 0 || Object.keys(this.filters).length !== 0) {
			// 지도 reisze 처리
			this.resetMap(this.map);
		}
	}
	
	// 지도 초기화
  	initMap() {
    
    	let lat = 37.5420749968945;
    	let lng = 127.05626408827251;
    
    	this.geolocation.getCurrentPosition().then((resp) => {
 			
 			lat = resp.coords.latitude;
 			lng = resp.coords.longitude;
 			
			console.log("buy.ts geolocation => ", lat, lng);
			 
			if (this.markers.length === 0) {
				this.map.setCenter(new google.maps.LatLng(lat, lng));
			}
 			
		}).catch((error) => {
  			console.log("Error getting location", error);
		});
    
    	this.map = new google.maps.Map(this.mapElement.nativeElement, {
      		zoom: 5,
            center: {lat: lat, lng: lng},
            minZoom: 5,
            maxZoom: 21
		});
	}
	
	// 초기 목록 가져오기
	initList() {

		this.loading.show("잠시 기둘...");

		if (Object.keys(this.points).length === 0 && (Object.keys(this.filters).length === 0 && this.products.length === 0)) {

			let headers = new HttpHeaders();
			headers = headers.append("Content-Type", "application/json; charset=UTF-8");

			this.http.post("http://localhost/shopping/hastag/apiSelectBuyProduct.do", {}, { headers: headers })
			.subscribe((res: any) => {

				console.log("buy.ts initList results => %o", res);

				this.products = res.products || [];
				this.processList();

			}, (err) => {

				this.loading.hide();
				this.alert.showWithMessage("failed loading json data");
			});
		} else {

            if (Object.keys(this.points).length === 0) {
                this.processList();
            } else {
                this.searchRadius();
            }
		}
	}

	// 더보기 
	moreList() {

		let headers = new HttpHeaders();
		headers = headers.append("Content-Type", "application/json; charset=UTF-8");

		this.filters["page"] = this.page * BuyPage.LINE_SIZE;
		this.filters["lineSize"] = BuyPage.LINE_SIZE

		// 로딩 화면을 보여줌
		this.loading.show("잠시 기둘...");

		this.http.post("http://localhost/shopping/hastag/apiSelectBuyProduct.do", this.filters, { headers: headers })
		.subscribe((res: any) => {

            console.log("buy.ts moreList results => %o", res);
            
            if(res.success) {
			
				if (res.products.length === 0) {
                    this.alert.showWithMessage("더이상 없엉..");
    
                } else {
                    // 기존 목록과 합침
                    this.products = this.products.concat(res.products);
                }
    
                this.processList();
			
			} else {
                
                this.loading.hide();
				this.alert.showWithMessage(res.message);
			}

		}, (err) => {

			this.loading.hide();
			this.alert.showWithMessage("failed loading json data");
		});
	}

	// 리스트 처리
	processList() {

		this.clearMarkers();

		if (this.products.length === 0) {

			this.emptyMessage = "검색된 구매목록이 없습니다.";	

			this.initMap();
			this.page = 0;

		} else {

			this.addMarkers();
			this.page += 1;
		}

		this.loading.hide();
    }
    
    searchRadius() {
    
        this.addMarker(this.points.x, this.points.y, "", "");

        // 일단은 검색 목록이 없는걸로...
        this.products.length = 0;
        this.emptyMessage = "검색된 구매목록이 없습니다.";	

        console.log("marker => ", this.markers);
        console.log("marker length => ", this.markers.length);

        this.loading.hide();
    }

	// 지도 리셋
	resetMap(map: any) {

		const zoom = map.getZoom();
		const center = map.getCenter();

		google.maps.event.trigger(map, "resize");

		map.setZoom(zoom);
		map.setCenter(center);
    }

	// 마커 추가
	addMarkers() {

		this.products.forEach(obj => {

			const coords = obj.SALE_COORDINATE.split(",");

			// 좌표이므로 무조건 2개이여야 함
			if (coords.length === 2) {
                this.addMarker(Number(coords[0]), Number(coords[1]), obj.TITLE, `제목 : ${obj.TITLE} <br/> 내용 : ${obj.CONTENT}`);   
			}
        });

        console.log("addMarkers => ", this.markers);
        console.log("addMarkers length => ", this.markers.length);
    }
    
    addMarker(x: any, y: any, title: string, content: string) {

        const bounds = new google.maps.LatLngBounds();

        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(y, x),
            map: this.map,
            title: title
        });

        if (content) {

            const infoWindow = new google.maps.InfoWindow({
                content: content
            });
    
            marker.addListener("click", function() {
                infoWindow.open(this.map, marker);
            });
        }
        
        this.markers.push(marker);
        bounds.extend(marker.getPosition());

        //  bounds 값에 따라 자동 레벨 조정
		this.map.fitBounds(bounds);
    }

	// 모든 마커 지우기
	clearMarkers() {

		this.markers.forEach(marker => {
			marker.setMap(null);
		});

		this.markers.length = 0;
	}

	// 상세보기
	detailGo(id: number) {

		const product = this.products.find(obj => { return obj.PRODUCT_SEQ === id });
		this.navCtrl.push(BuyDetailPage, {product: product});
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

