import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
    'Content-Type': 'application/json'
  });

  constructor(
    public http:Http,
  ) { }

  setArticulos(prospecto){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "articulos/setArticulos",prospecto,options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getArticulos(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "articulos/getArticulos",options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
