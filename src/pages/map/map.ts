import { Component, ViewChild, ElementRef } from "@angular/core";
import { } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
	selector: "page-map",
  	templateUrl: "map.html"
})
export class Map {

	@ViewChild("map") mapElement: ElementRef;
	
	map: any;
	
	constructor(private geolocation: Geolocation) { }
	
	ionViewDidLoad() {
		
   		this.initMap();
	  }
	  
	ionViewDidEnter() {
		console.log("map.ts ionViewDidEnter...");
		google.maps.event.trigger(this.map,"resize");
	}
    
    initMap() {
    
    	let lat = 37.5420749968945;
    	let lng = 127.05626408827251;
    
    	this.geolocation.getCurrentPosition().then((resp) => {
 			
 			lat = resp.coords.latitude;
 			lng =  resp.coords.longitude;
 			
 			console.log("geolocation => ", lat, lng);
 			
 			this.map.setCenter(new google.maps.LatLng(lat, lng));
 			
		}).catch((error) => {
		
  			console.log("Error getting location", error);
		});
    
    	this.map = new google.maps.Map(this.mapElement.nativeElement, {
      		zoom: 18,
      		center: {lat: lat, lng: lng}
		});
	}
}
