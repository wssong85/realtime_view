import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GUserProvider } from '../../providers/g-user/g-user';
import { AlertProvider } from '../../providers/alert/alert';

/*
  Generated class for the gAjaxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class gAjaxProvider {

    constructor(public http: HttpClient, public alert: AlertProvider, public gUser: GUserProvider) {
        console.log('Hello gAjaxProvider Provider');
        console.log("call?");
    }

    /**
     * gMapAjax : 맵을 인자값으로 호출하는 ajax
     * 
     * obj { url   : 호출 url
     *     , param : 호출시 보낼 parameter
     *     , ajaxType : 타입
     *     , USER_ID : userid
     *     , USER_PW : userpw 
     * }
     */
    gFnAjax(obj, callbackFnc) {

        //this를 받는방법
        //apply해서 넘기는방법
        //바인딩해서 넘기는방법
        let vdMethod = "";
        let lastIndex = obj.url.lastIndexOf("/")+1;
        vdMethod = obj.url.substring(lastIndex, lastIndex+3);

        //리턴값
        let returnData = { "result" : ""
                         , "msg"    : ""
                         , "data"   : {}
        };

        //api로 시작하는 메소드인지 확인
        if (vdMethod!="api") {

            returnData.result = "false";
            returnData.msg = "api 주소가 아닙니다.";
            return returnData;
            
        } else {

            let headers = new HttpHeaders();
            headers = headers.append("Content-Type", "application/json; charset=UTF-8");

            obj.param.USER_ID = this.gUser.get("USER_ID");
            obj.param.PASSWORD = this.gUser.get("PASSWORD");
            
            this.http.post(obj.url, obj.param, { headers: headers })
            .subscribe((res: any)  => {
                
            	if (res.success) {

                    console.log(res);
                    console.log("!!!!!!!!!!!!!");
                    console.log("==>" + res.result);
                    
                    returnData.result = res.success;
                    returnData.msg    = res.message;
                    returnData.data   = res.data;

                    callbackFnc(returnData);
                
            	} else {

                    //alert
                    this.alert.showWithMessage("failed loading json data");

                    this.alert.showWithMessage("failed loading json data");
            	}
                
            }, (err) => {

                this.alert.showWithMessage("failed loading json data");

            });

        }





        
    }

Y
    /** 
     * gListAjax : list를 인자값으로 호출하는 ajax
     */
    gListAjax() {

    }

    
}
