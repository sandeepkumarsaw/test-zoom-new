import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(
    private http: HttpClient, 
  ) { }

  getZoomHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      
      Authorization: `Bearer ${atob("Bny47qq2TJWmaykCQ5JYkA:O8kbyPdHplJmqZbCSwnWL6rO5HATKU5A")}`
    });
  }

  getZoomCalendarToken(code: any){
    let cal_data = new URLSearchParams();
    cal_data.set('client_id', 'Bny47qq2TJWmaykCQ5JYkA');
    //cal_data.set('scope', environment.OutlookCalendarCred.scope);
    // cal_data.set('code', code);
    //cal_data.set('redirect_uri', environment.OutlookCalendarCred.redirect_uri);
    //cal_data.set('grant_type', environment.OutlookCalendarCred.grant_type);
    cal_data.set('client_secret', 'O8kbyPdHplJmqZbCSwnWL6rO5HATKU5A');
    //let cal_data = `client_id=${environment.OutlookCalendarCred.client_id}&scope=${environment.OutlookCalendarCred.scope}&code=${code}&redirect_uri=${environment.OutlookCalendarCred.redirect_uri}&grant_type=${environment.OutlookCalendarCred.grant_type}&client_secret=${environment.OutlookCalendarCred.client_secret}`
    return this.http.post<any>("https://zoom.us/oauth/token?grant_type=client_credentials", cal_data.toString(), {headers: this.getZoomHeader()})
  }
}
