import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidTipoTextService } from '../servicios/validaciones/validTipoText/valid-tipo-text.service';
import { ArticulosService } from '../servicios/http-service/articulos/articulos.service';
import { MessagesService } from '../servicios/Messages/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editarticulo',
  templateUrl: './editarticulo.component.html',
  styleUrls: ['./editarticulo.component.css']
})
export class EditarticuloComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  formulario: FormGroup;
  titulo = "Nuevo Articulo";
  submitted: boolean = false;
  idarticulo = 0;

  constructor(
    private formBuilder: FormBuilder,
    public validText: ValidTipoTextService,
    private route: ActivatedRoute,
    public articulos: ArticulosService,
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
      descripcion: [null,[Validators.required]],
      modelo: [null,[Validators.required]],
      precio: [null],
      existencia: [null,[Validators.required]],
    });

    this.formulario.get('estatus').disable()
  }

  initFormEdit(params){
    this.titulo = "Editando Articulo";
    this.idarticulo = params.id;

    this.formulario = this.formBuilder.group({
      descripcion: [params.descripcion,[Validators.required]],
      modelo: [params.modelo,[Validators.required]],
      precio: [params.precio],
      existencia: [params.existencia,[Validators.required]],
    });

  }

  get validaF() { return this.formulario.controls; }

  guardar(val) {
    this.submitted = true;
    var route = this.router

    if (this.formulario.valid) {
      val.id = this.idarticulo

      this.articulos.setArticulos(val).then(data => {
        var res: any = data
        res = JSON.parse(res._body)
        
        if(res.codigo == 200){
          this.MessagesService.showSuccessDialog(res.mensaje,'sucess').then(function (data){
            if(data.isConfirmed){
              route.navigate(['/articulos'])
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
