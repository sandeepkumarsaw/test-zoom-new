import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(
    private http: HttpClient, 
  ) { }

  getZoomCalendarToken(code: any){
    let cal_data = new URLSearchParams();
    
    //cal_data.set('scope', environment.OutlookCalendarCred.scope);
    cal_data.set('code', code);

    //let cal_data = `client_id=${environment.OutlookCalendarCred.client_id}&scope=${environment.OutlookCalendarCred.scope}&code=${code}&redirect_uri=${environment.OutlookCalendarCred.redirect_uri}&grant_type=${environment.OutlookCalendarCred.grant_type}&client_secret=${environment.OutlookCalendarCred.client_secret}`
    return this.http.post<any>("https://zoom.us/oauth/token?grant_type=client_credentials", cal_data.toString(), {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
  }
}
