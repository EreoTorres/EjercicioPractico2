import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidTipoTextService } from '../servicios/validaciones/validTipoText/valid-tipo-text.service';
import { ArticulosService } from '../servicios/http-service/articulos/articulos.service';
import { ClientesService } from '../servicios/http-service/clientes/clientes.service';
import { ConfiguracionService } from '../servicios/http-service/configuracion/configuracion.service';
import { CuponesService } from '../servicios/http-service/cupones/cupones.service';
import { VentasService } from '../servicios/http-service/ventas/ventas.service';
import { MessagesService } from '../servicios/Messages/messages.service';
import { Select2OptionData } from 'ng-Select2';
import { Options } from 'select2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newventa',
  templateUrl: './newventa.component.html',
  styleUrls: ['./newventa.component.css']
})
export class NewventaComponent implements OnInit {

  public options: Options;
  clientes: any = [];
  articulos: any = [];
  datos: any = [];
  listarticulos: any = [];
  articulo: any;
  formulario: FormGroup;
  submitted: boolean = false;
  ivaConf: any = 0.00;
  importe: any = 0.00;
  iva: any = 0.00;
  descuento: any = 0.00;
  total: any = 0.00;
  cupon: any;
  appliCupon: any = {id: 0,usado: 0};
  cliente: any;
  titulo = 'Nueva Venta';
  ver = 0;

  constructor(public articulosS: ArticulosService,public clientesS: ClientesService,
    private formBuilder: FormBuilder, private MessagesService: MessagesService, private configS: ConfiguracionService,private ventasS: VentasService,
    private cuponesS: CuponesService, public router: Router, private route: ActivatedRoute) {    
    this.getArticulos();
    this.getClientes(); 
    this.initFormNew();
    this.getConfiguracion();
  }

  ngOnInit() {
    this.options = {
      closeOnSelect: true,
      width: '300',
      height: '38'
    };

    this.route
    .queryParams
    .subscribe(params => {
      if(params.id){
        this.ver = 1;
        this.getVena(params);
      }else{
        this.initFormNew()
      }
    });
  }

  getClientes(){
    this.clientesS.getClientes().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.datos = [];

        for(let datos of res.resultado){
          this.datos.push({id: datos.id, text: datos.id +' - '+ datos.nombre+' '+datos.pApellido+' '+datos.mApellido})
        }

        this.clientes = this.datos;
      }else{
        //this.mensaje = res.mensaje
      }
    });
  }

  getArticulos(){
    this.articulosS.getArticulos().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.datos = [];

        for(let datos of res.resultado){
          this.datos.push({id: JSON.stringify(datos), text: datos.descripcion})
        }

        this.articulos = this.datos;      
      }else{
        //this.mensaje = res.mensaje
      }
    });
  }

  getConfiguracion(){
    this.configS.getConfiguracion().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        for(let datos of res.resultado){
          this.ivaConf = datos.iva/100
        }
      }else{
        //this.mensaje = res.mensaje
      }
    });
  }

  getVena(params){
    this.importe = params.importe
    this.iva = params.iva
    this.descuento = params.descuento
    this.total = params.total
    this.cupon = params.cupon
    this.cliente = params.cliente
    console.log(JSON.parse(params.articulos))

    for(let datos of JSON.parse(params.articulos)){
      this.articulo = JSON.stringify(datos)
      var items = this.formulario.get('articulos') as FormArray;
      items.push(this.addItemsToForm());
    }
  }

  initFormNew(){
    this.formulario = this.formBuilder.group({
      articulos: this.formBuilder.array([])
    });
  }

  get validaF() { return this.formulario.controls.articulos['controls']; }

  
  addItemsToForm(): FormGroup {
    var art = JSON.parse(this.articulo);

    return  this.formBuilder.group({
      idarticulo: [art.id,Validators.required],
      descripcion: [art.descripcion,Validators.required],
      modelo: [art.modelo,Validators.required],
      cantidad: [1,Validators.required],
      precio: [art.precio,Validators.required],
      importe: [art.precio * 1,Validators.required]
    });
  }

  addItem(){
    var existe = false;
    var art = JSON.parse(this.articulo);

    for(let item of this.formulario.get('articulos')['controls']){
      if(art.id == item.get('idarticulo').value){
        existe = true
      }
    }

    if(!existe){
      var items = this.formulario.get('articulos') as FormArray;
      items.push(this.addItemsToForm());

      this.calculaImportes(1);
    }else{
      this.MessagesService.showSuccessDialog('El articulo ya fue ingresado','error')
    }
  }

  deleteItem(id){
    this.formulario.get('articulos')['controls'].splice(id,1);
    this.formulario.get('articulos').updateValueAndValidity();

    this.calculaImportes(1);
  }

  calculaImportes(ev){ 
    var importe = 0;
    var cantidad = 0;

    if(ev == 1){
      cantidad = ev
    }else{
      cantidad = ev.target.value
    }

    for(let item of this.formulario.get('articulos')['controls']){
      item.get('importe').setValue(item.get('precio').value * cantidad);
      importe += parseFloat(item.get('importe').value);
    }
    
    this.importe = importe.toFixed(2);
    this.iva = (importe*this.ivaConf).toFixed(2)
    this.total = (parseFloat(this.iva)+parseFloat(this.importe)).toFixed(2)
  }

  cambioCupon(){
    if(!this.cupon){
      this.iva = (this.importe*this.ivaConf).toFixed(2)
      this.total = (parseFloat(this.iva)+parseFloat(this.importe)).toFixed(2)
      this.descuento = 0.00
    }

    this.appliCupon.usado = 0
  }

  searchCupon() {
    if(this.appliCupon.usado != 1 && this.formulario.get('articulos')['controls'].length > 0){
      this.cuponesS.searchCupon(this.cupon).then(data => {
        var res: any = data
        res = JSON.parse(res._body)
  
        if(res.codigo == 200){
          for(let datos of res.resultado){
            this.appliCupon = datos;
  
            if(datos.tipo == 'porcentaje'){
              var des = datos.descuento/100
              this.descuento = (parseFloat(this.total)*des).toFixed(2);
              this.total = (parseFloat(this.total)-parseFloat(this.descuento)).toFixed(2)
            }else{
              this.descuento = (datos.descuento).toFixed(2);
              this.total = (parseFloat(this.total)-parseFloat(datos.descuento)).toFixed(2)
            }
  
            this.appliCupon.usado = 1;
          }
        }else{
          this.MessagesService.showSuccessDialog(res.mensaje,'error')
          this.iva = (this.importe*this.ivaConf).toFixed(2)
          this.total = (parseFloat(this.iva)+parseFloat(this.importe)).toFixed(2)
          this.descuento = 0.00
        }
      });
    }
  }

  guardar() {
    var pasa = true;
    this.submitted = true;
    var thiss = this

    if (this.formulario.valid ) {
      if(this.formulario.get('articulos')['controls'].length == 0){
        this.MessagesService.showSuccessDialog("No es posible continuar, los articulos son necesarios",'error')
        pasa = false
      }

      if(!this.cliente){
        pasa = false
        this.MessagesService.showSuccessDialog("No es posible continuar, el cliente es necesario",'error')
      }

      if(pasa){
        this.MessagesService.showConfirmDialog("Esta seguro de guardar la venta?",'warning').then(function (data){
          if(data.isConfirmed){
            thiss.sendVenta()
          }
        })  
      }
    } else {
      this.MessagesService.showSuccessDialog("No es posible continuar, los campos marcados en rojo son obligatorios",'error')
    }
  }

  sendVenta(){
    var articulos = []
    var route = this.router

    for(let item of this.formulario.get('articulos')['controls']){
      articulos.push({idarticulo: item.get('idarticulo').value,cantidad: item.get('cantidad').value})
    }

    var jsonResult = {idcliente: this.cliente,idcupon: this.appliCupon.id,importe: this.importe,iva: this.iva, descuento: this.descuento,total: this.total,articulos: articulos}

    this.ventasS.setVentas(jsonResult).then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        this.MessagesService.showSuccessDialog(res.mensaje,'sucess').then(function (data){
          if(data.isConfirmed){
            route.navigate(['/ventas'])
          }
        }) 
      }else{
        this.MessagesService.showSuccessDialog(res.mensaje,'error')
      }    
    });

  }

  salir(){
    if(this.ver == 0){
      var route = this.router
      this.MessagesService.showConfirmDialog("Si acepta no se guardaran los cambios realizados",'warning').then(function (data){
        if(data.isConfirmed){
          route.navigate(['/ventas'])
        }
      })  
    }else{
      this.router.navigate(['/ventas'])
    }
  }
}
