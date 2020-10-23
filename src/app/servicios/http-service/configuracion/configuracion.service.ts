import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
    'Content-Type': 'application/json'
  });

  constructor(
    public http:Http,
  ) { }

  setConfiguracion(config){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "configuracion/setConfiguracion",config,options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getConfiguracion(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "configuracion/getConfiguracion",options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
