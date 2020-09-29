import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListprospectosService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
      'Content-Type': 'application/json'
  });

  constructor(
    public http:Http,
  ) { }

  getProspectos(filtro){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "prospectos/getProspectos",{filtro: filtro},options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getEstatus(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "estatus/getEstatus",options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
