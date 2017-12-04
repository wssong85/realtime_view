import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

declare var google;

@Component({
	selector: "page-map",
  	templateUrl: "map.html"
})
export class Map {

	@ViewChild("map") mapElement: ElementRef;
	
	map: any;
	
	constructor(public navCtrl: NavController) { }
	
	ionViewDidLoad() {
   		this.initMap();
  	}
    
    initMap() {
    
    	this.map = new google.maps.Map(this.mapElement.nativeElement, {
      		zoom: 7,
      		center: {lat: 41.85, lng: -87.65}
    	});

	}
}
