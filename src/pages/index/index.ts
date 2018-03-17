import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Tab } from 'ionic-angular';

import { MapPage } from '../map/map';
import { BuyPage } from '../buy/buy';
import { SellPage } from '../sell/sell';

import { Zone } from '../zone/zone';
import { FilterPage } from '../filter/filter';

@IonicPage()
@Component({
  templateUrl: 'index.html',
})
export class IndexPage {

	@ViewChild("tabs") tabRef: Tabs;

	tab1Root = MapPage;
	tab2Root = BuyPage;
	tab3Root = SellPage;

	currentIdx: number = 0;
	filters: object = {};
    products: any[] = [];
    points: object = {};

	tabRootParams:object = {};
	
	constructor(public navCtrl: NavController, public navParams: NavParams) {

		// navParams 처리
		const tabIdx = this.navParams.get("tabIdx");
		const filters = this.navParams.get("filters");
        const products = this.navParams.get("products");
        const points = this.navParams.get("points");

        console.log(this.navParams);
		
		// tabIdx 값이 숫자이고 0 이상 
		if (!isNaN(tabIdx) && tabIdx >= 0) {
			// 화면에 보여질 탭 설정
			this.currentIdx = tabIdx;
		}
		
		this.filters = filters || {};		// 필터를 통해서 왔는지 여부
        this.products = products || []; 	// 필터 검색 결과
        this.points = points || {};         // 장소 검색 결과

		// 탭으로 보낼 데이터 설정
		this.tabRootParams = {
			filters: this.filters,
            products: this.products,
            points: this.points
		}
	}

	ionViewDidLoad() { 

		 // tab 갯수보다 작다면
		if (this.currentIdx < this.tabRef.length()) {

			// tab 변경
			this.tabRef.select(this.currentIdx);
		}
	}

	pushMap(v) {
		this.navCtrl.push(Zone);
	}
	
	pushSettings(v) {
		this.navCtrl.push(FilterPage, { tabIdx: this.currentIdx });
	}

	tabSelected(tab: Tab) {
		this.currentIdx = tab.index;
	}
}
