import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidTipoTextService } from '../servicios/validaciones/validTipoText/valid-tipo-text.service';
import { ClientesService } from '../servicios/http-service/clientes/clientes.service';
import { MessagesService } from '../servicios/Messages/messages.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.css']
})
export class EditclienteComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  formulario: FormGroup;
  titulo = "Nuevo Cliente";
  submitted: boolean = false;
  idcliente = 0;

  constructor(
    private formBuilder: FormBuilder,
    public validText: ValidTipoTextService,
    private route: ActivatedRoute,
    public DetalleService: ClientesService,
    private MessagesService: MessagesService,
    public router: Router
  ) {  }

  ngOnInit(): void {
    this.route
    .queryParams
    .subscribe(params => {
      if(params.id){
        this.initFormEdit(params)
      }else{
        this.initFormNew()
      }
    });
  }

  initFormNew(){
    this.formulario = this.formBuilder.group({
      nombre: [null,[Validators.required]],
      pApellido: [null,[Validators.required]],
      mApellido: [null],
      rfc: [null,[Validators.required]],
    });

    this.formulario.get('estatus').disable()
  }

  initFormEdit(params){
    this.titulo = "Editando Cliente";
    this.idcliente = params.id;

    this.formulario = this.formBuilder.group({
      nombre: [params.nombre,[Validators.required]],
      pApellido: [params.pApellido,[Validators.required]],
      mApellido: [params.mApellido],
      rfc: [params.rfc,[Validators.required]],
    });

  }

  get validaF() { return this.formulario.controls; }

  guardar(val) {
    this.submitted = true;
    var route = this.router

    if (this.formulario.valid) {
      val.id = this.idcliente

      this.DetalleService.setCliente(val).then(data => {
        var res: any = data
        res = JSON.parse(res._body)
        
        if(res.codigo == 200){
          this.MessagesService.showSuccessDialog(res.mensaje,'sucess').then(function (data){
            if(data.isConfirmed){
              route.navigate(['/clientes'])
            }
          }) 
        }else{
          this.MessagesService.showSuccessDialog(res.mensaje,'error')
        }
      });
    } else {
      console.log(val.estatus)
      this.MessagesService.showSuccessDialog("No es posible continuar, los campos marcados en rojo son obligatorios",'error')
    }
  }
}
