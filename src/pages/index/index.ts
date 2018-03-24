import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Tab } from 'ionic-angular';

import { BuyProvider } from '../../providers/buy/buy';

import { MapPage } from '../map/map';
import { BuyPage } from '../buy/buy';
import { SellPage } from '../sell/sell';
import { FilterPage } from '../filter/filter';
import { Zone } from '../zone/zone';

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

	tabRootParams:object = {};
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public buy: BuyProvider) {

		// navParams 처리
		const tabIdx = this.navParams.get("tabIdx");
		const filter = this.navParams.get("filter");
        const zone = this.navParams.get("zone");
        const products = this.navParams.get("products");

		// tabIdx 값이 숫자이고 0 이상 
		if (!isNaN(tabIdx) && tabIdx >= 0) {
			// 화면에 보여질 탭 설정
			this.currentIdx = tabIdx;
		}
        
        // 필터 검색 조건 설정
        if (filter && Object.keys(filter).length !== 0) {
            buy.filter = filter;
        }

         // 장소 검색 조건
        if (zone && Object.keys(zone).length !== 0) {
            buy.zone = zone;
        }

		// 탭으로 보낼 데이터 설정
		this.tabRootParams = {
			filter: buy.filter,
            zone: buy.zone
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
