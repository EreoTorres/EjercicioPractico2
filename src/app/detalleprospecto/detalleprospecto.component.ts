import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidTipoTextService } from '../servicios/validaciones/validTipoText/valid-tipo-text.service';
import { ListprospectosService } from '../servicios/http-service/listprospectos/listprospectos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalleprospecto',
  templateUrl: './detalleprospecto.component.html',
  styleUrls: ['./detalleprospecto.component.css']
})
export class DetalleprospectoComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  formulario: FormGroup;
  titulo = "Nuevo Prospecto";
  ItemsDocs: any = [];
  submitted: boolean = false
  estatusG: any = [];
  estatusEdit = 1;

  constructor(
    private formBuilder: FormBuilder,
    public validText: ValidTipoTextService,
    private route: ActivatedRoute,
    public estadosHTTP: ListprospectosService,
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

      this.getEstatus()
    });
  }

  initFormNew(){
    this.estatusEdit = 1

    this.formulario = this.formBuilder.group({
      nombre: [null,[Validators.required]],
      pApellido: [null,[Validators.required]],
      sApellido: [null,[Validators.required]],
      calle: [null,Validators.required],
      numero: [null,Validators.required],
      colonia:  [null,Validators.required],
      cp:  [null,Validators.required],
      telefono: [null,Validators.required],
      rfc: [null,[Validators.required]],
      estatus: [this.estatusEdit,[Validators.required]],
      observaciones: [null,[Validators.required]],
      documentos: this.formBuilder.array([this.addItemsToFormDoc()])
    });

    this.formulario.get('estatus').disable()
  }

  initFormEdit(params){
    var estats = ''
    this.estatusEdit = params.idestatus

    if(params.idestatus != 1){
      estats = params.idestatus
    }
    
    this.formulario = this.formBuilder.group({
      nombre: [params.nombre,[Validators.required]],
      pApellido: [params.pApellido,[Validators.required]],
      sApellido: [params.sApellido],
      calle: [params.calle,Validators.required],
      numero: [params.numero,Validators.required],
      colonia:  [params.colonia,Validators.required],
      cp:  [params.cp,Validators.required],
      telefono: [params.telefono,Validators.required],
      rfc: [params.rfc,[Validators.required]],
      estatus: [estats,[Validators.required]],
      observaciones: [params.observaciones,[Validators.required]],
      documentos: this.formBuilder.array([this.addItemsToFormDoc()])
    });

    this.disableInputs()
  }

  disableInputs(){
    this.formulario.get('nombre').disable()
    this.formulario.get('pApellido').disable()
    this.formulario.get('sApellido').disable()
    this.formulario.get('calle').disable()
    this.formulario.get('numero').disable()
    this.formulario.get('colonia').disable()
    this.formulario.get('cp').disable()
    this.formulario.get('telefono').disable()
    this.formulario.get('rfc').disable()
    this.formulario.get('observaciones').disable()

    if(this.estatusEdit != 1){
      this.formulario.get('estatus').disable()
    }
  }

  
  getEstatus(){
    this.estadosHTTP.getEstatus().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        for(let estatus of res.resultado){
          if(estatus.id != 1){
            this.estatusG.push(estatus)
          }
        }

        console.log(this.estatusG)
      }
    });
  }

  addItemDoc(){
    var items = this.formulario.get('documentos') as FormArray;
    items.push(this.addItemsToFormDoc());
  }

  addItemsToFormDoc(): FormGroup {
    return  this.formBuilder.group({
      doc: [null,Validators.required],
      docfile: [null,Validators.required]
    });
  }

  deleteItemDoc(id){
    this.formulario.get('documentos')['controls'].splice(id,1);
    this.formulario.get('documentos').updateValueAndValidity();
  }

  get validaF() { return this.formulario.controls; }
  get validaFDocs() { return this.formulario.controls.documentos['controls']; }

  guardar(val) {
    this.submitted = true;

    console.log(val)
  }
}
