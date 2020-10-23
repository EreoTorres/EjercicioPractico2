import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
    'Content-Type': 'application/json'
  });

  constructor(
    public http:Http,
  ) { }

  setCliente(prospecto){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "clientes/setClientes",prospecto,options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getClientes(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      this.http.post(this.url + "clientes/getClientes",options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
