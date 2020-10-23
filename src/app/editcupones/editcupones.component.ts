import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidTipoTextService } from '../servicios/validaciones/validTipoText/valid-tipo-text.service';
import { CuponesService } from '../servicios/http-service/cupones/cupones.service';
import { MessagesService } from '../servicios/Messages/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcupones',
  templateUrl: './editcupones.component.html',
  styleUrls: ['./editcupones.component.css']
})
export class EditcuponesComponent implements OnInit {


  faTrash = faTrash;
  faPlus = faPlus;
  formulario: FormGroup;
  titulo = "Nuevo Cupon";
  submitted: boolean = false;
  idcupon = 0;

  constructor(
    private formBuilder: FormBuilder,
    public validText: ValidTipoTextService,
    private route: ActivatedRoute,
    public cuponesS: CuponesService,
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
      codigo: [null,[Validators.required]],
      tipo: [null,[Validators.required]],
      descuento: [null,[Validators.required]],
    });

    this.formulario.get('estatus').disable()
  }

  initFormEdit(params){
    this.titulo = "Editando Cupon";
    this.idcupon = params.id;

    this.formulario = this.formBuilder.group({
      codigo: [params.codigo,[Validators.required]],
      tipo: [params.tipo,[Validators.required]],
      descuento: [params.descuento,[Validators.required]],
    });

  }

  get validaF() { return this.formulario.controls; }

  guardar(val) {
    this.submitted = true;
    var route = this.router

    if (this.formulario.valid) {
      val.id = this.idcupon

      this.cuponesS.setCupones(val).then(data => {
        var res: any = data
        res = JSON.parse(res._body)
        
        if(res.codigo == 200){
          this.MessagesService.showSuccessDialog(res.mensaje,'sucess').then(function (data){
            if(data.isConfirmed){
              route.navigate(['/cupones'])
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
