import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../servicios/http-service/clientes/clientes.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any;
  mensaje: any;
  estatusG: any;
  pagination: any;

  constructor(public clientesS: ClientesService,public router: Router) { }

  ngOnInit(): void {
    this.getProspectos()
  }

  getProspectos(){
    this.clientesS.getClientes().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.clientes = res.resultado
        this.mensaje = ''
      }else{
        this.mensaje = res.mensaje
      }
    });
  }

  editCliente(cliente){
    this.router.navigate(['/ncliente'],{ queryParams: cliente, skipLocationChange: true })
  }
}
