import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
    'Content-Type': 'application/json'
  });

  constructor(
    public http:Http,
  ) { }

  setVentas(venta){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "ventas/setVentas",venta,options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getVentas(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "ventas/getVentas",options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
