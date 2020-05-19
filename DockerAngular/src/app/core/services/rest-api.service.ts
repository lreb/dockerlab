import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, map, filter, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    public http: HttpClient
  ) { }

  public getFullUrl(url: string): string {
    return environment.host + url;
  }

  public get<T>(url): Observable<T> {
    return this.http.get<T>(this.getFullUrl(url))
    .pipe(
        map(res => {
        return res;
    }),
    catchError(err => {
        return throwError(this.handleError(err));
     })
    );
  }

  public handleError = (error: Response) => {
    // Do messaging and error handling here
    console.log(error);
    if (0 === error.status) {
        console.log('Server is unreachable or is down ', 'Error!');
    } else if (401 === error.status) {
        console.log(error.statusText, 'Authorization!');
    } else if (403 === error.status) {
        console.log(error.statusText, 'Authorization!');
    } else if (404 === error.status) {
        console.log('Objetive not found', 'Error!');
    } else if (500 === error.status) {
        console.log('Something fails, please notify IT Area.', 'Unexpected Error!');
    } else if (200 === error.status) {

    } else if (201 === error.status) {

    } else {
        console.log(error.statusText + ' (" + error.status + ")');
        // return Observable.throw(error);
    }
    return Observable.throw(error);
  }
}
