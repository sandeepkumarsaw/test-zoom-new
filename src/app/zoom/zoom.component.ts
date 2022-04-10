import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.open(`https://zoom.us/oauth/authorize?response_type=code&client_id=WBd6tpAsR2iZwgGdfzGsuQ&redirect_uri=https%3A%2F%2Fwebdev-test-1.herokuapp.com%2Fappointment`, "_self")
  
  }

}
