import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the MapSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
    selector: 'page-map-search',
    templateUrl: 'map-search.html',
})
export class MapSearchPage {

    @ViewChild("map") mapElement: ElementRef;

    coordinate: string = "";
    location: string = "";
	
    map: any;
    marker: any;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, 
        public http: HttpClient, public alert: AlertProvider, public loading: LoadingProvider) {}

    ionViewDidLoad() {
        this.initMap();
    }

    ionViewDidEnter() {
		console.log("map-search.ts ionViewDidEnter...");

		// 지도 reisze 처리
		this.resetMap(this.map);
    }

    initMap() {
    
    	let lat = 37.5420749968945;
    	let lng = 127.05626408827251;
    
    	this.map = new google.maps.Map(this.mapElement.nativeElement, {
      		zoom: 18,
            center: {lat: lat, lng: lng},
            minZoom: 5,
            maxZoom: 21
        });
        
        this.map.addListener("click", (e: any) => {

            const latLng = e.latLng;

            this.coordinate = latLng.lng() +", "+ latLng.lat();
            this.placeMarkerAndPanTo(latLng);
        });

        this.marker = new google.maps.Marker({
            map: this.map
        });

        this.geolocation.getCurrentPosition().then((resp) => {
 			
            lat = resp.coords.latitude;
            lng = resp.coords.longitude;
            
            console.log("map-search.ts geolocation => ", lat, lng);
            
            this.marker.setPosition(new google.maps.LatLng({lat: lat, lng: lng}));
            
       }).catch((error) => {
             console.log("Error getting location", error);
       });
    }
    
    placeMarkerAndPanTo(latLng: any) {

        this.marker.setPosition(latLng);
        this.map.panTo(latLng);

        this.requestReverseGeocoding(latLng);
    }

    requestReverseGeocoding(latLng: any) {

        const params = new HttpParams().set("query", latLng.lng() +","+ latLng.lat());
        const headers = new HttpHeaders({
            "Content-Type": "application/json; charset=UTF-8"
        });

        // 로딩 화면을 보여줌
		this.loading.show("잠시 기둘...");

        this.http.get("http://localhost/shopping/hastag/apiRequestReverseGeocoding.do", { 
            params: params,
            headers: headers
         })
        .subscribe((res: any) => {

            if(res.success) {

                // TODO: 유효성 체크
                // 제대로 받았다고 가정함
                const result = JSON.parse(res.result).result;

                console.log("map-search.ts result => %o", result);

                this.location = result.items[0].address;
			
			} else {
				this.alert.showWithMessage(res.message);
			}
            
            this.loading.hide();

        }, (err) => {

            this.loading.hide();
            this.alert.showWithMessage("failed loading json data");
        });
    }

    confirm() {

        const data = { 
            coordinate: this.coordinate,
            location: this.location
        };

        this.viewCtrl.dismiss(data);
    }
    
    resetMap(map: any) {

		const zoom = map.getZoom();
		const center = map.getCenter();

		google.maps.event.trigger(map, "resize");

		map.setZoom(zoom);
		map.setCenter(center);
	}
}
