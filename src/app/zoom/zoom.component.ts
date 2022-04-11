import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  addZoom() {
    window.open(`https://zoom.us/oauth/authorize?response_type=code&client_id=WBd6tpAsR2iZwgGdfzGsuQ&redirect_uri=https://webdev-test-1.herokuapp.com/appointment`, "_self")
  
  }

}
