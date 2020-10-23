import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../servicios/http-service/articulos/articulos.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-arituclos',
  templateUrl: './arituclos.component.html',
  styleUrls: ['./arituclos.component.css']
})
export class ArituclosComponent implements OnInit {

  articulos: any;
  mensaje: any;
  estatusG: any;
  pagination: any;

  constructor(public articulosS: ArticulosService,public router: Router) { }

  ngOnInit(): void {
    this.getArticulos()
  }

  getArticulos(){
    this.articulosS.getArticulos().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.articulos = res.resultado
        this.mensaje = ''
      }else{
        this.mensaje = res.mensaje
      }
    });
  }

  editProspecto(articulo){
    this.router.navigate(['/narticulo'],{ queryParams: articulo, skipLocationChange: true })
  }
}
