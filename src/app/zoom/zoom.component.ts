import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoomService } from '../zoom.service';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private zoomService: ZoomService
  ) { }

  calendarCode = this.route.snapshot.queryParams.code;
  calendarError = this.route.snapshot.queryParams.error;
  calendarState = this.route.snapshot.queryParams.state;

  ngOnInit(): void {
    if(this.calendarCode && this.calendarState=="zoomcalendar") {
      this.zoomService.getZoomCalendarToken(this.calendarCode).subscribe(
        data => {
          console.log(data);
        }
      )
    }
  }

  addZoom() {
    window.open(`https://zoom.us/oauth/authorize?response_type=code&client_id=WBd6tpAsR2iZwgGdfzGsuQ&redirect_uri=https://webdev-test-1.herokuapp.com/appointment&state=zoomcalendar`, "_self")
  
  }

}
