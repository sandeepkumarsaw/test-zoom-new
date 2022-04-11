import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64' ;
import { ZoomMtg } from '@zoomus/websdk';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(
    private http: HttpClient, 
  ) { }

  signatureEndpoint = 'http://localhost:4200'
  apiKey = 'JWT_API_KEY'
  meetingNumber = 123456789
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'WebSDK'
  userEmail = ''
  passWord = ''

  getZoomHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      //'Host': 'zoom.us',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Base64.encode("Bny47qq2TJWmaykCQ5JYkA:O8kbyPdHplJmqZbCSwnWL6rO5HATKU5A")}`
    });
  }

  getZoomCalendarToken(code: any){
    console.log(Base64.encode("Bny47qq2TJWmaykCQ5JYkA:O8kbyPdHplJmqZbCSwnWL6rO5HATKU5A"))
    let cal_data = new URLSearchParams();
    cal_data.set('client_id', 'Bny47qq2TJWmaykCQ5JYkA');
    //cal_data.set('scope', environment.OutlookCalendarCred.scope);
    cal_data.set('code', code);
    cal_data.set('redirect_uri', 'https://webdev-test-1.herokuapp.com/appointment');
    cal_data.set('grant_type', 'authorization_code');
    cal_data.set('client_secret', 'O8kbyPdHplJmqZbCSwnWL6rO5HATKU5A');
    //let cal_data = `client_id=${environment.OutlookCalendarCred.client_id}&scope=${environment.OutlookCalendarCred.scope}&code=${code}&redirect_uri=${environment.OutlookCalendarCred.redirect_uri}&grant_type=${environment.OutlookCalendarCred.grant_type}&client_secret=${environment.OutlookCalendarCred.client_secret}`
    return this.http.post<any>(`https://zoom.us/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=https://webdev-test-1.herokuapp.com/appointment`, cal_data, {headers: this.getZoomHeader()})
  }

  getSignature() {

    this.http.post(this.signatureEndpoint, {
       meetingNumber: this.meetingNumber,
       role: this.role
    }).toPromise().then((data: any) => {
       if(data.signature) {
          console.log(data.signature)
          this.startMeeting(data.signature)
       } else {
          console.log(data)
       }
    }).catch((error) => {
       console.log(error)
    })
 
 }

 startMeeting(signature: any) {

  ZoomMtg.init({
     leaveUrl: this.leaveUrl,
     isSupportAV: true,
     success: (success: any) => {
        console.log(success)

        ZoomMtg.join({
           signature: signature,
           meetingNumber: this.meetingNumber,
           userName: this.userName,
           apiKey: this.apiKey,
           userEmail: this.userEmail,
           passWord: this.passWord,
           success: (success: any) => {
              console.log(success)
           },
           error: (error: any) => {
              console.log(error)
           }
        })
     },
     error: (error: any) => {
        console.log(error)
     }
  })

}

}
