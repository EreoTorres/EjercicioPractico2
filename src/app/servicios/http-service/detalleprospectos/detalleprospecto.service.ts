import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleprospectoService {
  public url = environment.apiURL;
  httpHeaders = new Headers({        
      'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(
    public http:Http,
  ) { }

  getAyuda(){
    return new Promise((resolve, reject) => {
      let options = {
        headers: this.httpHeaders
      };

      let parametros = JSON.stringify({valor:"val"});
      
      this.http.post(this.url + "ayuda.php",parametros,options)
      .subscribe(data => {
        resolve(data);
      })
    });
  }
}
