import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoomService } from '../zoom.service';
import { ZoomMtg } from '@zoomus/websdk';
import { DOCUMENT } from '@angular/common';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { HttpClient } from '@angular/common/http';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private zoomService: ZoomService,
    @Inject(DOCUMENT) document: Document,
    private http: HttpClient, 
  ) { }

  calendarCode = this.route.snapshot.queryParams.code;
  calendarError = this.route.snapshot.queryParams.error;
  calendarState = this.route.snapshot.queryParams.state;

  signatureEndpoint = 'https://webdev-test-1.herokuapp.com'
  apiKey = 'AI2DlbF1TGO2tOl1tku8_Q'
  meetingNumber = 123456789
  role = 0
  leaveUrl = 'https://webdev-test-1.herokuapp.com'
  userName = 'JWT Auth'
  userEmail = ''
  passWord = ''

  

  ngOnInit(): void {
    


    if (this.calendarCode && this.calendarState == "zoomcalendar") {
      this.zoomService.getZoomCalendarToken(this.calendarCode).subscribe(
        data => {
          console.log(data);
        }
      )
    }
  }

  meeting() {
    this.getSignature();
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

  addZoom() {
    window.open(`https://zoom.us/oauth/authorize?response_type=code&client_id=WBd6tpAsR2iZwgGdfzGsuQ&redirect_uri=https://webdev-test-1.herokuapp.com/appointment&state=zoomcalendar`, "_self")

  }

}
