import { Component, OnInit } from '@angular/core';
import { RestApiService } from './core/services/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DockerAngular';
  data;

  constructor(
    public rest: RestApiService
    ) {

  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.GetData();
  }

  GetData() {
    this.rest.get('WeatherForecast').subscribe(res => {
      console.log(res);
      this.data = res;
    }, err => {
      console.log(err);
    });
  }
}
