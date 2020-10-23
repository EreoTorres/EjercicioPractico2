import { Component, OnInit } from '@angular/core';
import { VentasService } from '../servicios/http-service/ventas/ventas.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: any;
  mensaje: any;
  estatusG: any;
  pagination: any;

  constructor(public ventasS: VentasService,public router: Router) { }

  ngOnInit(): void {
    this.getVentas()
  }

  getVentas(){
    this.ventasS.getVentas().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.ventas = res.resultado
      }else{
        this.mensaje = res.mensaje
      }
    });
  }

  editVenta(venta){
    this.router.navigate(['/nventa'],{ queryParams: venta, skipLocationChange: true })
  }
}
