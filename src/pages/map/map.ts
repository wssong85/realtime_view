import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
	selector: "page-map",
  	templateUrl: "map.html"
})
export class MapPage {

	@ViewChild("map") mapElement: ElementRef;
	
	map: any;
	
	constructor(public geolocation: Geolocation) { }

	ionViewDidLoad() {
		
   		this.initMap();
	}
	  
	ionViewDidEnter() {
		console.log("map.ts ionViewDidEnter...");

		// 지도 reisze 처리
		this.resetMap(this.map);
	}
    
    initMap() {
    
    	let lat = 37.5420749968945;
    	let lng = 127.05626408827251;
    
    	this.geolocation.getCurrentPosition().then((resp) => {
 			
 			lat = resp.coords.latitude;
 			lng =  resp.coords.longitude;
 			
 			console.log("map.ts geolocation => ", lat, lng);
 			
 			this.map.setCenter(new google.maps.LatLng(lat, lng));
 			
		}).catch((error) => {
		
  			console.log("Error getting location", error);
		});
    
    	this.map = new google.maps.Map(this.mapElement.nativeElement, {
      		zoom: 18,
      		center: {lat: lat, lng: lng}
		});
	}

	resetMap(map: any) {

		const zoom = map.getZoom();
		const center = map.getCenter();

		google.maps.event.trigger(map, "resize");

		map.setZoom(zoom);
		map.setCenter(center);
	}
}
