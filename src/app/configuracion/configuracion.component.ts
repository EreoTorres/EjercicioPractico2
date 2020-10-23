import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidTipoTextService } from '../servicios/validaciones/validTipoText/valid-tipo-text.service';
import { ConfiguracionService } from '../servicios/http-service/configuracion/configuracion.service';
import { MessagesService } from '../servicios/Messages/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  formulario: FormGroup;
  submitted: boolean = false;
  idconfig = 0;

  constructor(
    private formBuilder: FormBuilder,
    public validText: ValidTipoTextService,
    private route: ActivatedRoute,
    public configS: ConfiguracionService,
    private MessagesService: MessagesService,
    public router: Router
  ) {  }

  ngOnInit(): void {
    this.initFormNew();
    this.getConfiguracion();
  }

  initFormNew(){
    this.formulario = this.formBuilder.group({
      iva: [null,[Validators.required]],
    });
  }

  getConfiguracion(){
    this.configS.getConfiguracion().then(data => {
      var res: any = data
      res = JSON.parse(res._body)

      if(res.codigo == 200){
        for(let datos of res.resultado){
          this.idconfig = datos.id;
          this.formulario.get('iva').setValue(datos.iva);
        }
      }
    });
  }

  get validaF() { return this.formulario.controls; }

  guardar(val) {
    this.submitted = true;

    if (this.formulario.valid) {
      val.id = this.idconfig

      this.configS.setConfiguracion(val).then(data => {
        var res: any = data
        res = JSON.parse(res._body)
        
        if(res.codigo == 200){
          this.MessagesService.showSuccessDialog(res.mensaje,'sucess')
          this.getConfiguracion()
        }else{
          this.MessagesService.showSuccessDialog(res.mensaje,'error')
        }
      });
    } else {
      this.MessagesService.showSuccessDialog("No es posible continuar, los campos marcados en rojo son obligatorios",'error')
    }
  }
}
