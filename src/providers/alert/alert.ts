import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// TODO: 콜백처리?
@Injectable()
export class AlertProvider {
    
    constructor(private alertCtrl: AlertController) { }

    showWithMessage(message: string) {

    	const alert = this.alertCtrl.create({
      		title: "알림",
      		subTitle: message,
      		buttons: ["확인"]
        });
        
    	alert.present();
  	}

    showWithTitleAndMessage(title: string, message: string) {

        const alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ["확인"]
        });
        
        alert.present();
    }
}
