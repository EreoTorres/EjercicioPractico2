import { Component, OnInit } from '@angular/core';
import { CuponesService } from '../servicios/http-service/cupones/cupones.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css']
})
export class CuponesComponent implements OnInit {

  cupones: any;
  mensaje: any;
  estatusG: any;
  pagination: any;

  constructor(public cuponesS: CuponesService,public router: Router) { }

  ngOnInit(): void {
    this.getCupones()
  }

  getCupones(){
    this.cuponesS.getCupones().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.cupones = res.resultado
        this.mensaje = ''
      }else{
        this.mensaje = res.mensaje
      }
    });
  }

  editCupon(cupon){
    this.router.navigate(['/ncupones'],{ queryParams: cupon, skipLocationChange: true })
  }
}
