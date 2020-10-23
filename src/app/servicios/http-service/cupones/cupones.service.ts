import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
    'Content-Type': 'application/json'
  });

  constructor(
    public http:Http,
  ) { }

  setCupones(cupones){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "cupones/setCupones",cupones,options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  searchCupon(cupon){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "cupones/searchCupones",{cupon: cupon},options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getCupones(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "cupones/getCupones",options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
