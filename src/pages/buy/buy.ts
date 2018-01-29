import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
	selector: 'page-buy',
  	templateUrl: 'buy.html'
})
export class Buy {

	@ViewChild("map") mapElement: ElementRef;
	
	users: any;
	map: any;

	constructor(private navCtrl: NavController, private http: HttpClient, private geolocation: Geolocation) {}
	
	ionViewDidLoad() {
	
   		this.initMap();
   		this.initList();
	}
	  
	ionViewDidEnter() {
		console.log("buy.ts ionViewDidEnter...");
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
	
	initList() {
	
		this.http.get('https://randomuser.me/api/?results=10')
		.subscribe((res: any) => {
			this.users = res.results;
		}, (err) => {
			alert("failed loading json data");
		});
	}
}

