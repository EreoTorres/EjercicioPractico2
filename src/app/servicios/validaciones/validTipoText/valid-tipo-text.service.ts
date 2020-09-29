import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidTipoTextService {

  constructor() { }


  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
