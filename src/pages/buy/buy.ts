import { Component, ViewChild, ElementRef } from "@angular/core";
import { Http, Headers } from '@angular/http';
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

	constructor(public navCtrl: NavController, public http: Http, private geolocation: Geolocation) {}
	
	ionViewDidLoad() {
   		this.initMap();
   		this.initList();
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
		
		.map(res => res.json())
		
		.subscribe(res => {
			this.users = res.results;
		}, (err) => {
			alert("failed loading json data");
		});
	}
}

